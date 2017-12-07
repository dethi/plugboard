import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import PaletteAction from '../../actions/paletteActions';
import { ElementType } from '../../libs/board/model/elementType';

function SelectableElement(props) {
  return (
    <a
      className={classNames('box', {
        'box-is-active': props.selected
      })}
      onClick={props.onClick}
    >
      <article className="media">
        <div className="media-content">
          <figure className="image">
            <img src={props.img} alt="Component Preview" />
          </figure>
          <div className="content has-text-centered">
            <strong className="title">{props.title}</strong>
          </div>
        </div>
      </article>
    </a>
  );
}

class Palette extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(PaletteAction.initPalette(this.props.user != null));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.palette.needToReload !== this.props.palette.needToReload) {
      nextProps.dispatch(PaletteAction.initPalette(nextProps.user != null));
    }
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
      <div className="on-canvas palette" data-tour="palette">
        <div className="box">
          <p className="component-name has-text-centered">
            {selectedBlueprint != null
              ? selectedBlueprint.title
              : 'Select a component'}
          </p>
          <nav className="level">
            {blueprints &&
              /*blueprints.map((e, index) => (
                <SelectableElement
                  key={index}
                  name={e.title}
                  img={e.preview}
                  selected={index === selectedBlueprintIndex}
                  onClick={() => this.updateSelectedBlueprint(index)}
                />
              ))*/
              blueprints.map(
                (e, index) =>
                  (!this.props.objectif.inObjectifMode ||
                    (this.props.objectif.inObjectifMode &&
                      e.type !== ElementType.INPUT &&
                      e.type !== ElementType.OUTPUT)) &&
                  <SelectableElement
                    key={index}
                    name={e.title}
                    img={e.preview}
                    selected={index === selectedBlueprintIndex}
                    onClick={() => this.updateSelectedBlueprint(index)}
                  />
              )}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    palette: state.palette,
    user: state.user,
    objectif: state.objectif
  };
};

Palette.PropTypes = {
  palette: PropTypes.object.isRequired,
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Palette);
