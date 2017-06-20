import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';

import BoardAction from '../../actions/boardActions';

import boardApi from '../../api/board';

class LoadBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalName: 'BOARD_LOAD',
      boards: null,
      boardId: null,
      loading: false
    };
  }

  onDisplay = () => {
    this.setState({ loading: true });
    boardApi.getBoards().then(boards => {
      console.log(boards);
      this.setState({
        boards: boards,
        loading: false
      });
    });
  };

  onCancel = () => {
    this.setState({ boardId: null });
  };

  onApply = () => {
    if (this.state.boardId === null) return;

    boardApi.getBoard(this.state.boardId).then(board => {
      console.log(board);

      const boardMetaData = { ...board };
      delete boardMetaData.versions;

      const versionData = board.versions[board.versions.length - 1];
      const boardData = JSON.parse(versionData.data);

      this.props.dispatch(BoardAction.loadBoard(boardMetaData, boardData));
    });
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
    const { boards, loading } = this.state;

    return (
      <Modal
        modalName={this.state.modalName}
        title="Load Board"
        content={
          <div>
            {loading &&
              <div className="has-text-centered">
                <span className="icon is-large">
                  <i className="fa fa-spinner fa-pulse" />
                </span>
              </div>}
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
                  ? <div className="has-text-centered">
                      <div className="notification is-warning">
                        <p>You don't have any saved boards</p>
                      </div>
                    </div>
                  : <div>
                      {boards.map(board => (
                        <div key={board.id} className="child">
                          <a onClick={() => this.selectBoard(board.id)}>
                            {board.title}
                            <img src={board.preview_url} alt="Board Preview" />
                          </a>
                        </div>
                      ))}
                    </div>}
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
