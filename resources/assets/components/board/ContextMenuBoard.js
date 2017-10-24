import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import PropTypes from 'prop-types';

import BoardAction from '../../actions/boardActions';
import ModalAction from '../../actions/modalActions';

import elementActions from './elementActions';

function ContextMenuItem(props) {
  return (
    <MenuItem>
      <a className="button" onClick={props.onClick}>
        <span className="icon">
          <i className={classNames('fa', props.icon)} />
        </span>
        <span>{props.title}</span>
      </a>
    </MenuItem>
  );
}

function DefaultMenu(props) {
  return (
    <div>
      <ContextMenuItem
        onClick={() => props.onElementAction(elementActions.ROTATE)}
        icon="fa-repeat"
        title="Rotate"
      />
      {!props.inObjectifMode &&
        props.isIO &&
        <ContextMenuItem
          onClick={() => props.onElementAction(elementActions.DELETE)}
          icon="fa-trash"
          title="Delete"
        />}
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

  handleRenameComp = () => {
    this.props.dispatch(ModalAction.displayModal('COMP_RENAME'));
  };

  handleElementAction = actionType => {
    this.props.dispatch(BoardAction.applyElementAction(actionType));
  };

  render() {
    const { loading, typeMenu } = this.props.contextMenu;
    const { inObjectifMode } = this.props.objectif;

    return (
      <ContextMenu
        id="bard_context_menu"
        className="box board-context-menu"
        hideOnLeave={true}
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
                    <ContextMenuItem
                      onClick={this.handleClearBoard}
                      icon="fa-trash"
                      title="Clear Board"
                    />
                  );
                case 0:
                case 1:
                  return (
                    <div>
                      {!inObjectifMode &&
                        <ContextMenuItem
                          onClick={this.handleRenameComp}
                          icon="fa-pencil"
                          title="Rename"
                        />}
                      <DefaultMenu
                        inObjectifMode={inObjectifMode}
                        isIO={true}
                        onElementAction={this.handleElementAction}
                      />
                    </div>
                  );
                case 2:
                case 3:
                  return (
                    <DefaultMenu
                      inObjectifMode={inObjectifMode}
                      isIO={false}
                      onElementAction={this.handleElementAction}
                    />
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
    contextMenu: state.contextMenu,
    objectif: state.objectif
  };
};

ContextMenuBoard.propTypes = {
  contextMenu: PropTypes.object.isRequired,
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ContextMenuBoard);
