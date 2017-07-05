import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

import componentApi from '../../api/component';

class SaveComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      dimX: 1,
      dimY: 1,
      err: null
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onDisplay = () => {
    this.setState({
      name: '',
      dimX: 1,
      dimY: 1,
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
    return (
      <Modal
        modalName="COMPONENT_SAVE"
        title="Save new Component"
        content={
          <div className="content save-component">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                {this.props.board.preview &&
                  <div className="box">
                    <img src={this.props.board.preview} alt="Preview" />
                  </div>}
              </div>
              <div className="column is-1 range-column">
                <input
                  value={this.state.dimY}
                  onChange={this.handleInputChange}
                  name="dimY"
                  type="range"
                  min="1"
                  max="5"
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
                max="3"
                className="range-horizontale"
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

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

SaveComponent.propTypes = {
  board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SaveComponent);
