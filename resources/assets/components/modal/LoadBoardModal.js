import React, { Component } from 'react';
import Modal from './Modal';

export default class LoadBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardId: null
    };
  }

  onApply = () => {
    this.props.onApply(this.state.boardId);
  };

  onCancel = () => {
    this.setState({ boardId: null });
    this.props.onCancel();
  };

  selectBoard = id => {
    this.setState({ boardId: id });
    console.log(id);
  };

  render() {
    const Previews = this.props.previews.map(preview => (
      <div key={preview.id} className="child">
        <a onClick={() => this.selectBoard(preview.id)}>
          <img
            src={preview.src}
            alt={preview.name}
            className={this.state.boardId === preview.id ? 'box' : ''}
          />
        </a>
      </div>
    ));

    return (
      <Modal
        isOpen={this.props.isOpen}
        onCancel={this.onCancel}
        title="Load Board"
        content={
          <div>
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
            <div className="parent">
              {Previews}
            </div>
          </div>
        }
        footer={
          <div>
            <a className="button is-success" onClick={this.onApply}>
              Load
            </a>
            <a className="button" onClick={this.onCancel}>Cancel</a>
          </div>
        }
      />
    );
  }
}
