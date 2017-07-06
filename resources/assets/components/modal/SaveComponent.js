import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';

import componentApi from '../../api/component';

import ComponentEditor from '../../libs/componentEditor/componentEditor';

class SaveComponent extends Component {
  constructor(props) {
    super(props);

    this.componentEditor = null;

    this.state = {
      name: '',
      dimX: 1,
      dimY: 1,
      color: '#88D498',
      err: null
    };
  }

  componentDidMount() {
    this.componentEditor = new ComponentEditor(9, 9, this.refs.canvas);
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    switch (name) {
      case 'dimX':
        this.componentEditor.updateDimX(value);
        break;
      case 'dimY':
        this.componentEditor.updateDimY(value);
        break;
      case 'color':
        this.componentEditor.updateColor(value);
        break;
      case 'name':
        this.componentEditor.updateTitle(value);
        break;
      default:
    }
  };

  onDisplay = () => {
    this.setState({
      name: '',
      dimX: 1,
      dimY: 1,
      color: '#88D498',
      err: null
    });
  };

  onApply = () => {
    return new Promise((resolve, reject) => {
      componentApi
        .saveNewComponent(this.state.name)
        .then(data => {
          this.setState({ err: null });
          console.log('Board Save', data);

          /*boardApi
            .saveBoard(
              data.id,
              this.props.board.boardData,
              this.props.board.preview
            )
            .then(data => {
              console.log('Board First version Save', data);
              resolve();
            })
            .catch(response => console.log(response));

          this.props.dispatch(BoardAction.setBoardMetaData(data));
          */
          resolve(); // REMOVE ME
        })
        .catch(response => {
          if (response.status === 422) {
            const errFormat = [];
            Object.values(response.data).forEach(err => errFormat.push(err[0]));
            this.setState({ err: errFormat });
            reject();
          }
        });
    });
  };

  render() {
    const style = {
      overflow: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      color: '#88D498'
    };

    return (
      <Modal
        modalName="COMPONENT_SAVE"
        title="Save new Component"
        content={
          <div className="content save-component">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <div className="box" style={style}>
                  <canvas ref="canvas" />
                </div>
              </div>
              <div className="column is-1 range-column">
                <input
                  value={this.state.dimY}
                  onChange={this.handleInputChange}
                  name="dimY"
                  type="range"
                  min="1"
                  max="7"
                  className="range-verticale"
                  required
                />
              </div>
            </div>
            <div className="field">
              <input
                value={this.state.dimX}
                onChange={this.handleInputChange}
                name="dimX"
                type="range"
                min="1"
                max="5"
                className="range-horizontale"
                required
              />
            </div>
            <div className="field">
              <input
                value={this.state.color}
                onChange={this.handleInputChange}
                type="color"
                name="color"
                required
              />
            </div>
            <div className="control">
              <input
                value={this.state.name}
                onChange={this.handleInputChange}
                label="Name"
                className="input"
                name="name"
                type="text"
                placeholder="Component Name"
                required
                autoFocus
              />
            </div>
          </div>
        }
        success="Save"
        onApply={this.onApply}
        onDisplay={this.onDisplay}
        err={this.state.err}
      />
    );
  }
}

export default connect()(SaveComponent);
