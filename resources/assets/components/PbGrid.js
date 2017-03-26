import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fabric } from 'fabric';
import { Button } from 'react-toolbox/lib/button';

const gridSize = 30;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}

class Grid {
  constructor(width, height, el) {
    this.width = width;
    this.height = height;
    this.space = [width * height];

    this.gridWidth = this.width * gridSize;
    this.gridHeight = this.height * gridSize;
    this.fabricCanvas = new fabric.Canvas();
    this.fabricCanvas.initialize(el, {
      height: this.gridHeight,
      width: this.gridWidth,
    });

    this.leftMin = gridSize;
    this.leftMax = this.gridWidth - 2 * gridSize;
    this.topMin = gridSize;
    this.topMax = this.gridHeight - 2 * gridSize;

    this.color = 'red';
    this.add = true;

    this.fabricCanvas.on('mouse:down', options => {
      if (!this.add) return;

      const mousePos = this.fabricCanvas.getPointer(options.e);
      const pos = new Vector(Math.floor(mousePos.x / gridSize), Math.floor(mousePos.y / gridSize));

      if (!this.isInside(pos) || this.get(pos) !== undefined) return;

      this.addRect(pos);
    });

    for(let x = 1; x < (this.fabricCanvas.width / 5); x++)
    {
      this.fabricCanvas.add(new fabric.Line([gridSize*x, 0, gridSize*x, this.gridHeight],
        { stroke: "#000000", strokeWidth: 1, selectable:false, strokeDashArray: [5, 5]}));
      this.fabricCanvas.add(new fabric.Line([0, gridSize*x, this.gridWidth, gridSize*x],
        { stroke: "#000000", strokeWidth: 1, selectable:false, strokeDashArray: [5, 5]}));
    }
  }

  isInside(vector) {
    return vector.x > 0
			&& vector.x < this.width - 1
			&& vector.y > 0
			&& vector.y < this.height - 1;
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

class Rect {
  constructor(grid, vector, color) {
    this.grid = grid;
    this.pos = vector;
    this.color = color;
    this.fabricRect = new fabric.Rect({
      top : gridSize * vector.y,
      left : gridSize * vector.x,
      width : gridSize,
      height : gridSize,
      fill : color,
      hasControls: false
    });

    this.fabricRect.on('moving', options => {
      let left = Math.round(options.e.offsetX / gridSize) * gridSize;
      left = Math.max(Math.min(left, this.grid.leftMax), this.grid.leftMin);
      this.fabricRect.left = left;

      let top = Math.round(options.e.offsetY / gridSize) * gridSize;
      top = Math.max(Math.min(top, this.grid.topMax), this.grid.topMin);
      this.fabricRect.top = top;

      const newPos = new Vector(Math.floor(left / gridSize), Math.floor(top / gridSize));

      if (!newPos.equals(this.pos)) {
        this.grid.set(this.pos, undefined);
        this.pos = newPos;
        this.grid.set(this.pos, this);
      }
    });
  }
}

let grid;
class GridReact extends Component {
  componentDidMount() {
    grid = new Grid(15, 10, this.refs.canvas)
  };
  setColorToRed() {
    grid.color = 'red';
    grid.add = true;
  }
  setColorToGreen() {
    grid.color = 'green';
    grid.add = true;
  }
  unset() {
    grid.add = false;
  }
  render() {
    return (
      <div>
        <canvas ref="canvas"></canvas>
        <Button label="Set to Red" onClick={this.setColorToRed}/>
        <Button label="Set to Green" onClick={this.setColorToGreen}/>
        <Button label="Nothing" onClick={this.unset}/>
      </div>
    );
  }
}

export default () =>
<div>
  <GridReact />
</div>;
