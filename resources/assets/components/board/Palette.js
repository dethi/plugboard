import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import PaletteAction from '../../actions/paletteActions';
import { createSimplePalette } from '../../libs/utils/createSimple';
import { ImageElementProvider } from '../../libs/utils/imageElementProvider';

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

SelectableElement.PropTypes = {
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  img: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

class Palette extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(PaletteAction.addBlueprints(createSimplePalette()));
  }

  updateSelectedBlueprint = index => {
    const { blueprints, selectedBlueprint } = this.props.palette;
    if (blueprints[index] === selectedBlueprint)
      this.props.dispatch(PaletteAction.unselecteBlueprint());
    else
      this.props.dispatch(PaletteAction.selectBlueprint(blueprints[index]));
  };

  render() {
    const { blueprints, selectedBlueprint } = this.props.palette;
    let selectedBlueprintIndex = -1;
    if (blueprints)
      selectedBlueprintIndex = blueprints.indexOf(selectedBlueprint);

    return (
      <div className="column is-one-quarter">
        <nav className="panel">
          <p className="panel-heading">
            Components
          </p>
          {blueprints &&
            blueprints.map((e, index) => (
              <SelectableElement
                key={index}
                name={e.name}
                img={ImageElementProvider.getElementImage(e.img)}
                selected={index === selectedBlueprintIndex}
                onClick={() => this.updateSelectedBlueprint(index)}
              />
            ))}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    palette: state.palette
  };
};

Palette.PropTypes = {
  palette: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Palette);