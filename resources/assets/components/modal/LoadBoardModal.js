import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Modal from './Modal';

import BoardAction from '../../actions/boardActions';

import boardApi from '../../api/board';

function SelectableElement(props) {
  return (
    <a
      className={classNames('box', {
        'box-is-active': props.selected
      })}
      onClick={props.onClick}
    >
      <article className="media">
        <div className="media-content">
          <figure className="image">
            <img src={props.img} alt="Board Preview" />
          </figure>
          <div className="content has-text-centered">
            <strong className="title">{props.title}</strong>
          </div>
        </div>
      </article>
    </a>
  );
}

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
    const { boards, loading } = this.state;

    return (
      <Modal
        modalName={this.state.modalName}
        title="Load Board"
        content={
          <div className="load-board-modal">
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
              <div>
                {boards.length === 0
                  ? <div className="has-text-centered">
                      <div className="notification is-warning">
                        <p>You don't have any saved boards</p>
                      </div>
                    </div>
                  : <div className="parent">
                      {boards.map(board => (
                        <SelectableElement
                          key={board.id}
                          title={board.title}
                          img={board.preview_url}
                          selected={board.id === this.state.boardId}
                          onClick={() => this.selectBoard(board.id)}
                        />
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
