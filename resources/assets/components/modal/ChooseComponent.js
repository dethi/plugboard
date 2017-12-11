import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';
import SelectableElementBoxImg from '../util/SelectableElementBoxImg';

import ComponentAction from '../../actions/componentActions';

class ChooseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalName: 'COMPONENT_CHOOSE',
      componentsInPalette: null,
      components: null,
      componentId: null,
      componentIsInPalette: false,
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.component !== this.props.component) {
      const data = nextProps.component.components;
      if (!data) return;

      const components = [];
      const componentsInPalette = [];

      data.forEach(el => {
        if (el.is_selected) componentsInPalette.push(el);
        else components.push(el);
      });

      this.setState({
        components: components,
        componentsInPalette: componentsInPalette
      });
    }
  }

  onDisplay = () => {
    this.setState({ loading: true });

    this.props.dispatch(ComponentAction.getComponentsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  };

  selectComponent = (id, use) => {
    this.setState({
      componentId: id,
      componentIsInPalette: use
    });
  };

  moveComponent = () => {
    if (!this.state.componentId) return;

    const {
      components,
      componentsInPalette,
      componentIsInPalette,
      componentId
    } = this.state;

    if (componentIsInPalette) {
      componentsInPalette.forEach((el, index) => {
        if (el.id === componentId) {
          components.push(el);
          componentsInPalette.splice(index, 1);
        }
      });
    } else {
      components.forEach((el, index) => {
        if (el.id === componentId) {
          componentsInPalette.push(el);
          components.splice(index, 1);
        }
      });
    }

    this.props.dispatch(
      ComponentAction.selectComponent(componentId, componentIsInPalette)
    );

    this.setState({
      components: components,
      componentsInPalette: componentsInPalette,
      componentIsInPalette: !this.state.componentIsInPalette
    });
  };

  render() {
    const {
      components,
      componentsInPalette,
      componentIsInPalette,
      componentId,
      loading
    } = this.state;

    return (
      <Modal
        modalName={this.state.modalName}
        title="Choose your components"
        content={
          <div className="choose-component-modal">
            {loading
              ? <div className="has-text-centered">
                  <span className="icon is-large">
                    <i className="fa fa-spinner fa-pulse" />
                  </span>
                </div>
              : componentsInPalette &&
                  components &&
                  <div className="columns">
                    <div className="column is-6">
                      <div className="content has-text-centered">
                        <strong className="title">Palette</strong>
                      </div>
                      {componentsInPalette.length === 0
                        ? <div className="has-text-centered">
                            <div className="notification is-warning">
                              <p>You can add components in your palette</p>
                            </div>
                          </div>
                        : <div className="parent">
                            {componentsInPalette.map(component => (
                              <SelectableElementBoxImg
                                key={component.id}
                                title={component.title}
                                img={component.preview_url}
                                selected={component.id === componentId}
                                onClick={() =>
                                  this.selectComponent(component.id, true)}
                              />
                            ))}
                          </div>}
                    </div>
                    <div className="column is-6 vertical-line">
                      <div className="content has-text-centered">
                        <strong className="title">Stock</strong>
                      </div>
                      {components.length === 0
                        ? <div className="has-text-centered">
                            <div className="notification is-warning">
                              <p>You don't have any saved/unused components</p>
                            </div>
                          </div>
                        : <div className="parent">
                            {components.map(component => (
                              <SelectableElementBoxImg
                                key={component.id}
                                title={component.title}
                                img={component.preview_url}
                                selected={component.id === componentId}
                                onClick={() =>
                                  this.selectComponent(component.id, false)}
                              />
                            ))}
                          </div>}
                    </div>
                  </div>}

            <div className="has-text-centered">
              <a
                className="button is-success is-medium"
                onClick={this.moveComponent}
              >
                <span className="icon">
                  {componentIsInPalette
                    ? <i className="fa fa-arrow-right" />
                    : <i className="fa fa-arrow-left" />}
                </span>
              </a>
            </div>
          </div>
        }
        onDisplay={this.onDisplay}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    component: state.component
  };
};

ChooseComponent.propTypes = {
  board: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ChooseComponent);
