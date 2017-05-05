import React, { Component } from 'react';
import classNames from 'classnames';

import { createSimplePalette } from '../libs/element/createSimplePalette';

function SelectableElement(props) {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <a
      className={classNames('panel-block', 'app-palette-item', {
        'is-active': props.selected
      })}
      onClick={props.onClick}
    >
      <figure className="media-left">
        <p className="image is-24x24">
          <img src={props.img} alt={props.name} />
        </p>
      </figure>
      {capitalize(props.name)}
    </a>
  );
}

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: createSimplePalette(),
      curElementId: 0
    };

    console.log(this.state.elements);
  }

  updateStateOnClick = index => {
    this.setState({ curElementId: index });
    this.props.updatePalette(this.state.elements[index]);
  };

  render() {
    const { elements, curElementId } = this.state;

    return (
      <div className="column is-one-quarter">
        <nav className="panel">
          <p className="panel-heading">
            Components
          </p>
          {elements.map((e, index) => (
            <SelectableElement
              key={index}
              name={e.name}
              img={e.img}
              selected={index === curElementId}
              onClick={() => this.updateStateOnClick(index)}
            />
          ))}
        </nav>
      </div>
    );
  }
}
