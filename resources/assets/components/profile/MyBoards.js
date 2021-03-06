import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Element from './Element';

import BoardAction from '../../actions/boardActions';
import boardApi from '../../api/board';

class MyBoards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      err: null,
      success: null
    };
  }

  componentDidMount() {
    this.props.dispatch(BoardAction.getBoardsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  onApply = id => {
    this.props.dispatch(BoardAction.loadBoardAsync(id));
  };

  onDelete = board => {
    boardApi
      .deleteBoard(board.id)
      .then(() => {
        this.setState({ success: board.title + ' deleted!' });
        this.props.dispatch(BoardAction.getBoardsAsync());
      })
      .catch(response => {
        if (response.status === 422) {
          const errFormat = [];
          Object.values(response.data).forEach(err => errFormat.push(err[0]));
          this.setState({ err: 'An error occured' });
        }
        if (response.status === 401) {
          this.setState({ err: [response.data.status] });
        }
      });
  };

  onCloseNotif = type => {
    if (type === 0) this.setState({ success: '' });
    else this.setState({ err: '' });
  };

  render() {
    const { loading } = this.state;
    const { boards } = this.props.board;

    return (
      <div className="list-elements">
        {this.state.success &&
          <div className="notification is-primary">
            <button onClick={() => this.onCloseNotif(0)} className="delete" />
            <p>{this.state.success}</p>
          </div>}
        {this.state.err &&
          <div className="notification is-danger">
            <button onClick={() => this.onCloseNotif(1)} className="delete" />
            {<p>this.state.err</p>}
          </div>}
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
                      onClickDelete={() => this.onDelete(board)}
                      onClickEdit={() => this.onApply(board.id)}
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
