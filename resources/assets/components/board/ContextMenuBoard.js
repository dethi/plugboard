import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem } from 'react-contextmenu';

class ContextMenuBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  prepareMenu = () => {
    this.setState({ loading: true });
  };

  render() {
    const { loading } = this.state;

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
          : <div>
              <MenuItem>
                <a className="button">
                  <span className="icon">
                    <i className="fa fa-trash" />
                  </span>
                  <span>Delete</span>
                </a>
              </MenuItem>
              <MenuItem>
                <a className="button">
                  <span className="icon">
                    <i className="fa fa-repeat" />
                  </span>
                  <span>Rotate</span>
                </a>
              </MenuItem>
            </div>}
      </ContextMenu>
    );
  }
}

export default connect()(ContextMenuBoard);
