import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';

import BoardAction from '../../actions/boardActions';

import elementActions from './../board/elementActions';

class RenameCompModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
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
      name: ''
    });
  };

  onApply = () => {
    if (!this.state.name) return;
    this.props.dispatch(
      BoardAction.applyElementAction(elementActions.RENAME, this.state.name)
    );
  };

  render() {
    return (
      <Modal
        modalName="COMP_RENAME"
        title="Rename composant"
        content={
          <div className="content">
            <div className="field">
              <div className="control">
                <input
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  label="Name"
                  className="input"
                  name="name"
                  type="text"
                  placeholder="Composant Name"
                  maxLength="3"
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>
        }
        success="Rename"
        onApply={this.onApply}
        onDisplay={this.onDisplay}
      />
    );
  }
}

export default connect()(RenameCompModal);
