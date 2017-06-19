import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';

import boardApi from '../../api/board';

class LoadBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalName: 'BOARD_LOAD',
      boards: null,
      boardId: null
    };
  }

  onDisplay = () => {
    console.log('Display');
    boardApi.getBoards().then(boards => {
      console.log(boards);
      this.setState({ boards: boards });
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
    const { boards } = this.state;

    return (
      <Modal
        modalName={this.state.modalName}
        title="Load Board"
        content={
          <div>
            <span className="icon is-large">
              <i className="fa fa-spinner fa-pulse" />
            </span>
            {/*<div className="field has-addons">
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
            </div>*/}
            {boards &&
              <div className="parent is-loading">
                {boards.length === 0
                  ? <div className="notification is-warning is-fullwidth">
                      You don't have any saved boards
                    </div>
                  : <p>
                      lallala
                    </p>}
              </div>}
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

export default connect()(LoadBoardModal);
