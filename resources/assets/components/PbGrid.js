import React, { Component } from 'react';
import { fabric } from 'fabric';
import { Button } from 'react-toolbox/lib/button';

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}

class Rect {
  constructor(grid, vector, color) {
    this.grid = grid;
    this.pos = vector;
    this.color = color;
    this.fabricRect = new fabric.Rect({
      top: this.grid.gridSize * vector.y,
      left: this.grid.gridSize * vector.x,
      width: this.grid.gridSize,
      height: this.grid.gridSize,
      fill: color,
      hasControls: false
    });

    this.fabricRect.on('moving', options => {
      let left = Math.round(options.e.offsetX / this.grid.gridSize) *
        this.grid.gridSize;
      left = Math.max(Math.min(left, this.grid.leftMax), this.grid.leftMin);
      this.fabricRect.left = left;

      let top = Math.round(options.e.offsetY / this.grid.gridSize) *
        this.grid.gridSize;
      top = Math.max(Math.min(top, this.grid.topMax), this.grid.topMin);
      this.fabricRect.top = top;

      const newPos = new Vector(
        Math.floor(left / this.grid.gridSize),
        Math.floor(top / this.grid.gridSize)
      );

      if (!newPos.equals(this.pos)) {
        this.grid.set(this.pos, undefined);
        this.pos = newPos;
        this.grid.set(this.pos, this);
      }
    });
  }
}

class Grid {
  constructor(width, height, gridSize, el) {
    this.gridSize = 30;

    this.width = width;
    this.height = height;
    this.space = [width * height];

    this.gridWidth = this.width * this.gridSize;
    this.gridHeight = this.height * this.gridSize;

    this.fabricCanvas = new fabric.Canvas();
    this.fabricCanvas.initialize(el, {
      height: this.gridHeight,
      width: this.gridWidth
    });

    this.leftMin = this.gridSize;
    this.leftMax = this.gridWidth - 2 * this.gridSize;
    this.topMin = this.gridSize;
    this.topMax = this.gridHeight - 2 * this.gridSize;

    this.color = 'red';
    this.add = true;

    this.fabricCanvas.on('mouse:down', options => {
      if (!this.add) return;

      const mousePos = this.fabricCanvas.getPointer(options.e);
      const pos = new Vector(
        Math.floor(mousePos.x / this.gridSize),
        Math.floor(mousePos.y / this.gridSize)
      );

      if (!this.isInside(pos) || this.get(pos) !== undefined) return;

      this.addRect(pos);
    });

    for (let x = 1; x < this.fabricCanvas.width / 5; x++) {
      this.fabricCanvas.add(
        new fabric.Line(
          [this.gridSize * x, 0, this.gridSize * x, this.gridHeight],
          {
            stroke: '#000000',
            strokeWidth: 1,
            selectable: false,
            strokeDashArray: [5, 5]
          }
        )
      );
      this.fabricCanvas.add(
        new fabric.Line(
          [0, this.gridSize * x, this.gridWidth, this.gridSize * x],
          {
            stroke: '#000000',
            strokeWidth: 1,
            selectable: false,
            strokeDashArray: [5, 5]
          }
        )
      );
    }
  }

  isInside(vector) {
    return vector.x > 0 &&
      vector.x < this.width - 1 &&
      vector.y > 0 &&
      vector.y < this.height - 1;
  }

  get(vector) {
    return this.space[vector.x + this.width * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  }

  addRect(vector) {
    const newRect = new Rect(this, vector, this.color);
    this.set(vector, newRect);
    this.fabricCanvas.add(newRect.fabricRect);
  }
}

class GridReact extends Component {
  constructor(props) {
    super(props);

    this.grid = null;
  }
  componentDidMount() {
    this.grid = new Grid(15, 10, 30, this.refs.canvas);
  }
  setColorToRed = () => {
    this.grid.color = 'red';
    this.grid.add = true;
  };
  setColorToGreen = () => {
    this.grid.color = 'green';
    this.grid.add = true;
  };
  unset = () => {
    this.grid.add = false;
  };
  debug = () => {
    console.log(this.grid.fabricCanvas.toJSON());
  };
  render() {
    return (
      <div>
        <canvas ref="canvas" />
        <Button label="Set to Red" onClick={this.setColorToRed} />
        <Button label="Set to Green" onClick={this.setColorToGreen} />
        <Button label="Nothing" onClick={this.unset} />
        <Button label="Debug" onClick={this.debug} />
      </div>
    );
  }
}

export default () => (
  <div>
    <GridReact />
  </div>
);
