import React, { Component } from 'react';
import { connect } from 'react-redux';

import boardApi from '../../api/board';
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
    boardApi.getBoards().then(boards => {
      console.log(boards);
      this.setState({
        boards: boards,
        loading: false
      });
    });
  }
  onApply = id => {
    if (id === null) return;

    boardApi.getBoard(id).then(board => {
      console.log(board);

      const boardMetaData = { ...board };
      delete boardMetaData.versions;

      const versionData = board.versions[board.versions.length - 1];
      const boardData = JSON.parse(versionData.data);

      this.props.dispatch(BoardAction.loadBoard(boardMetaData, boardData));
    });
  };
  render() {
    const { boards, loading } = this.state;
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
    user: state.user
  };
};

export default connect(mapStateToProps)(MyBoards);
