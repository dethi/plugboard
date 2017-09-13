import React, { Component } from 'react';
import { connect } from 'react-redux';

import boardApi from '../../api/board';
import SelectableElementBoxImg from '../util/SelectableElementBoxImg';

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
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(MyBoards);
