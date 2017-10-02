import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Element from './Element';

import BoardAction from '../../actions/boardActions';

class MyBoards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.dispatch(BoardAction.getBoardsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  onApply = id => {
    if (id === null) return;

    this.props.dispatch(BoardAction.loadBoardAsync(id));
  };

  render() {
    const { loading } = this.state;
    const { boards } = this.props.board;

    return (
      <div>
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
                    <Element
                      key={board.id}
                      title={board.title}
                      img={board.preview_url}
                      isElement={false}
                      onClick={() => this.onApply(board.id)}
                    />
                  ))}
                </div>}
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    board: state.board
  };
};

MyBoards.propTypes = {
  user: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired
};


export default connect(mapStateToProps)(MyBoards);
