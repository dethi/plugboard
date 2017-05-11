import React, { Component } from 'react';
import classNames from 'classnames';

export default class SaveNewBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: ''
    };
  }

  updateName = event => {
    this.setState({ name: event.target.value });
  };

  updateDesc = event => {
    this.setState({ desc: event.target.value });
  };

  onApply = () => {
    this.props.onApply({
      name: this.state.name,
      desc: this.state.desc
    });
  };

  render() {
    return (
      <div
        className={classNames('modal', {
          'is-active': this.props.isOpen
        })}
      >
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Save new Board</p>
            <button onClick={this.props.onCancel} className="delete" />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Name</label>
              <p className="control">
                <input
                  className="input"
                  type="text"
                  value={this.state.name}
                  onChange={this.updateName}
                />
              </p>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <p className="control">
                <textarea
                  className="textarea"
                  value={this.state.desc}
                  onChange={this.updateDesc}
                />
              </p>
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button is-success" onClick={this.onApply}>
              Save
            </a>
            <a className="button" onClick={this.props.onCancel}>Cancel</a>
          </footer>
        </div>
      </div>
    );
  }
}
