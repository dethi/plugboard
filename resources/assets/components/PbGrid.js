import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fabric } from 'fabric';
import { Button } from 'react-toolbox/lib/button';

const fabricCanvas = new fabric.Canvas();

const grid = 30;
const gridHeight = 300;
const gridWidth = 600;
const gridsize = 5;

const leftMin = grid;
const leftMax = gridWidth - 2 * grid;
const topMin = grid;
const topMax = gridHeight - 2 * grid;

class Grid extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    fabricCanvas.initialize(el, {
    	height: gridHeight,
      width: gridWidth,
    });

    const rect = new fabric.Rect({
      top : grid,
      left : grid,
      width : grid,
      height : grid,
      fill : 'red',
      hasControls: false
    });

    fabricCanvas.on('object:moving', options => {
      let left = Math.round(options.target.left / grid) * grid;
      left = Math.max(Math.min(left, leftMax), leftMin);

      let top = Math.round(options.target.top / grid) * grid;
      top = Math.max(Math.min(top, topMax), topMin);

      options.target.set({ left, top });
    });

    for(let x = 1; x < (fabricCanvas.width / gridsize); x++)
    {
      fabricCanvas.add(new fabric.Line([grid*x, 0, grid*x, gridHeight],
        { stroke: "#000000", strokeWidth: 1, selectable:false, strokeDashArray: [5, 5]}));
      fabricCanvas.add(new fabric.Line([0, grid*x, gridWidth, grid*x],
        { stroke: "#000000", strokeWidth: 1, selectable:false, strokeDashArray: [5, 5]}));
    }
    fabricCanvas.add(rect);
  };
  render() {
    return (
      <canvas></canvas>
    );
  }
}

class NewComponent extends Component {
  addComponent() {
    fabricCanvas.add(new fabric.Rect({
      top : grid,
      left : grid,
      width : grid,
      height : grid,
      fill : 'red',
      hasControls: false
    }));
  }
  render() {
    return (
      <Button label="Add Component" onClick={this.addComponent}/>
    );
  }
}

export default () =>
<div>
  <Grid />
  <NewComponent />
</div>;
