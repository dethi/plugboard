import React, { Component } from 'react';

import Modal from './Modal';

import SaveBoard from '../../api/saveBoard';

export default class LoadBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardId: null
    };
  }

  onDisplay = () => {
    console.log('Display');
    SaveBoard.loadBoard().then(board => {
      console.log(board);
    });
  };

  onCancel = () => {
    this.setState({ boardId: null });
  };

  onApply = () => {
    // Change store
    console.log(this.state);
  };

  selectBoard = id => {
    this.setState({ boardId: id });
    console.log(id);
  };

  render() {
    /*const Previews = this.props.previews.map(preview => (
      <div key={preview.id} className="child">
        <a onClick={() => this.selectBoard(preview.id)}>
          <img
            src={preview.src}
            alt={preview.name}
            className={this.state.boardId === preview.id ? 'box' : ''}
          />
        </a>
      </div>
    ));*/

    return (
      <Modal
        modalName="BOARD_LOAD"
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
              {/*Previews*/}
            </div>
          </div>
        }
        success="Load"
        onApply={this.onApply}
        onCancel={this.onCancel}
        onDisplay={this.onDisplay}
      />
    );
  }
}
