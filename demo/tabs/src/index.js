import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Button from 'react-toolbox/lib/button/Button';
import { fabric } from 'fabric';



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
      selectable: false,
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

    const lines = [];
    for (let x = 1; x < this.gridWidth / this.gridSize; x++) {
      lines.push(
        new fabric.Line(
          [this.gridSize * x, 0, this.gridSize * x, this.gridHeight],
          {
            stroke: '#114B5F',
            selectable: false
          }
        )
      );
    }
    for (let x = 1; x < this.gridHeight / this.gridSize; x++) {
      lines.push(
        new fabric.Line(
          [0, this.gridSize * x, this.gridWidth, this.gridSize * x],
          {
            stroke: '#114B5F',
            selectable: false
          }
        )
      );
    }
    this.fabricGridLines = new fabric.Group(lines, {
      selectable: false
    });
    this.fabricCanvas.add(this.fabricGridLines);
  }
  setColorToBlue() {
    this.color = 'blue';
    this.add = true;
  }
  isInside(vector) {
    return vector.x > 0 &&
      vector.x < this.width - 1 &&
      vector.y > 0 &&
      vector.y < this.height - 1;
  }

  toggleVisibility() {
    this.fabricGridLines.visible = !this.fabricGridLines.visible;
    if (this.fabricGridLines.visible)
      this.fabricCanvas.remove(this.fabricGridLines);
    else
      this.fabricCanvas.add(this.fabricGridLines);
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

  getText() {
    return "hola";
  }
}
class Palette extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    <Button label={this.props.label}  onClick={this.props.grid}/>
  )
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
  gridVisible = () => {
    this.grid.toggleVisibility();
  };
  setColorToBlue = () => {
    this.grid.setColorToBlue()
  };
  render() {
    var stylePanel = {
      float: 'left',
      width: '20%'
    };
    var styleBoard = {
      float: 'right',
      width: '75%'
    };
    return (

    <div>
      <div style={stylePanel}>
				<Tabs>
					<TabList>
						<Tab>Components</Tab>
						<Tab>Search</Tab>
					</TabList>

					<TabPanel>
          <h3>Basic</h3>
          <Palette label="Set to Blue" grid={this.setColorToBlue} />
						<Button label="Set to Green" onClick={this.setColorToGreen} />
            <h3>Advanced</h3>
            <Palette label="Set to Blue" grid={this.setColorToBlue} />
  						<Button label="Set to Green" onClick={this.setColorToGreen} />
            <h3>Perso</h3>
  						<Button label="Set to Green" onClick={this.setColorToGreen} />
						</TabPanel>
					<TabPanel>
						<Button label="Nothing" onClick={this.unset} />
						<Button label="Debug" onClick={this.debug} />
						<Button label="Grid" onClick={this.gridVisible} />
					</TabPanel>

				</Tabs>

      </div>
      <div style={styleBoard}>
        <canvas ref="canvas" />
      </div>
            </div>

    );
  }
}
render(<GridReact/>, document.getElementById('board'));

//render(, document.getElementById('sidebar'));
