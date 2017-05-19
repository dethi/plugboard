import React, { Component } from 'react';
import Modal from './Modal';

import Text from '../fields/Text';

export default class LoadBoardModal extends Component {
  onApply = () => {
    this.props.onApply(
      {
        // FIXME: get the selected board
      }
    );
  };

  render() {
    const onCancel = this.props.onCancel;

    return (
      <Modal
        isOpen={this.props.isOpen}
        onCancel={onCancel}
        title="Load Board"
        content={
          <div className="field has-addons">
            <p className="control">
              <input className="input" type="text" placeholder="Recherche" />
            </p>
            <p className="control">
              <button type="submit" className="button is-primary">
                <span className="icon">
                  <i className="fa fa-search" />
                </span>
              </button>
            </p>
          </div>
        }
        footer={
          <div>
            <a className="button is-success" onClick={this.onApply}>
              Load
            </a>
            <a className="button" onClick={onCancel}>Cancel</a>
          </div>
        }
      />
    );
  }
}
