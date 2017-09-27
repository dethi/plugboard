import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import PropTypes from 'prop-types';

import BoardAction from '../../actions/boardActions';
import ModalAction from '../../actions/modalActions';

import elementActions from './elementActions';

function DefaultMenu(props) {
  return (
    <div>
      <MenuItem>
        <a
          className="button"
          onClick={() => props.onElementAction(elementActions.ROTATE)}
        >
          <span className="icon">
            <i className="fa fa-repeat" />
          </span>
          <span>Rotate</span>
        </a>
      </MenuItem>
      <MenuItem>
        <a
          className="button"
          onClick={() => props.onElementAction(elementActions.DELETE)}
        >
          <span className="icon">
            <i className="fa fa-trash" />
          </span>
          <span>Delete</span>
        </a>
      </MenuItem>
    </div>
  );
}

DefaultMenu.PropTypes = {
  onElementAction: PropTypes.func.isRequired
};

class ContextMenuBoard extends Component {
  /*
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.contextMenu);

    if (nextProps.contextMenu !== this.props.contextMenu) {
      // this.rotate();
    }
  }*/

  prepareMenu = () => {
    this.setState({ loading: true });

    this.props.dispatch(BoardAction.prepareContextMenu());
  };

  handleClearBoard = () => {
    this.props.dispatch(ModalAction.displayModal('BOARD_CLEAR'));
  };

  handleElementAction = actionType => {
    this.props.dispatch(BoardAction.applyElementAction(actionType));
  };

  render() {
    const { loading, typeMenu } = this.props.contextMenu;

    return (
      <ContextMenu
        id="bard_context_menu"
        className="box board-context-menu"
        onShow={this.prepareMenu}
      >
        {loading
          ? <div className="has-text-centered">
              <span className="icon is-large">
                <i className="fa fa-spinner fa-pulse" />
              </span>
            </div>
          : (() => {
              switch (typeMenu) {
                case -1:
                  return (
                    <div>
                      <MenuItem>
                        <a className="button" onClick={this.handleClearBoard}>
                          <span className="icon">
                            <i className="fa fa-trash" />
                          </span>
                          <span>Clear Board</span>
                        </a>
                      </MenuItem>
                    </div>
                  );
                case 0:
                case 1:
                  return (
                    <div>
                      <MenuItem>
                        <a
                          className="button"
                          onClick={() =>
                            this.handleElementAction(elementActions.RENAME)}
                        >
                          <span className="icon">
                            <i className="fa fa-pencil" />
                          </span>
                          <span>Rename</span>
                        </a>
                      </MenuItem>
                      <DefaultMenu onElementAction={this.handleElementAction} />
                    </div>
                  );
                case 2:
                case 3:
                  return (
                    <DefaultMenu onElementAction={this.handleElementAction} />
                  );
                default:
                  return <div />;
              }
            })()}
      </ContextMenu>
    );
  }
}

const mapStateToProps = state => {
  return {
    contextMenu: state.contextMenu
  };
};

ContextMenuBoard.propTypes = {
  contextMenu: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ContextMenuBoard);
