import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';
import SelectableElementBoxImg from '../util/SelectableElementBoxImg';

import BoardAction from '../../actions/boardActions';

class LoadBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalName: 'BOARD_LOAD',
      boardId: null,
      loading: false
    };
  }

  onDisplay = () => {
    this.setState({ loading: true });

    this.props.dispatch(BoardAction.getBoardsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  };

  onCancel = () => {
    this.setState({ boardId: null });
  };

  onApply = () => {
    if (this.state.boardId === null) return;
    this.props.dispatch(BoardAction.loadBoardAsync(this.state.boardId));
  };

  selectBoard = id => {
    this.setState({ boardId: id });
    console.log(id);
  };

  render() {
    const { loading } = this.state;
    const { boards } = this.props.board;

    return (
      <Modal
        modalName={this.state.modalName}
        title="Load Board"
        content={
          <div className="list-elements">
            {loading &&
              <div className="has-text-centered">
                <span className="icon is-large">
                  <i className="fa fa-spinner fa-pulse" />
                </span>
              </div>}
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
                        <SelectableElementBoxImg
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

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

LoadBoardModal.propTypes = {
  board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LoadBoardModal);
