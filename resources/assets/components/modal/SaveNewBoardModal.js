import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

import BoardAction from '../../actions/boardActions';

import boardApi from '../../api/board';

class SaveNewBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      err: null
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onDisplay = () => {
    this.setState({
      name: '',
      err: null
    });
  };

  onApply = () => {
    return new Promise((resolve, reject) => {
      boardApi
        .saveNewBoard(this.state.name)
        .then(data => {
          this.setState({ err: null });
          console.log('Board Save', data);

          boardApi
            .saveBoard(
              data.id,
              this.props.board.boardData,
              this.props.board.preview
            )
            .then(data => {
              console.log('Board First version Save', data);
              resolve();
            })
            .catch(response => console.log(response));

          this.props.dispatch(BoardAction.setBoardMetaData(data));
        })
        .catch(response => {
          if (response.status === 422) {
            const errFormat = [];
            Object.values(response.data).forEach(err => errFormat.push(err[0]));
            this.setState({ err: errFormat });
            reject();
          }
        });
    });
  };

  render() {
    return (
      <Modal
        modalName="BOARD_SAVE"
        title="Save new Board"
        content={
          <div className="content">
            {this.props.board.preview &&
              <div>
                <img src={this.props.board.preview} alt="Preview" />
              </div>}
            <div className="field">
              <div className="control">
                <input
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  label="Name"
                  className="input"
                  name="name"
                  type="text"
                  placeholder="Board Name"
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>
        }
        success="Save"
        onApply={this.onApply}
        onDisplay={this.onDisplay}
        err={this.state.err}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

SaveNewBoardModal.propTypes = {
  board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SaveNewBoardModal);
