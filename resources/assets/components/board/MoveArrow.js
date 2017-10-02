import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardAction from '../../actions/boardActions';

import elementActions from './elementActions';

class MoveArrow extends Component {
  handleClick = dir => {
    this.props.dispatch(
      BoardAction.applyElementAction(elementActions.MOVE, dir)
    );
  };

  render() {
    return (
      <div className="on-canvas on-canvas-right move-arrow">
        <div className="box">
          <div className="has-text-centered">
            <a className="button" onClick={() => this.handleClick('up')}>
              <span className="icon">
                <i className="fa fa-arrow-up" />
              </span>
            </a>
          </div>

          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <a className="button" onClick={() => this.handleClick('left')}>
                  <span className="icon">
                    <i className="fa fa-arrow-left" />
                  </span>
                </a>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <a
                  className="button"
                  onClick={() => this.handleClick('center')}
                >
                  <span className="icon">
                    <i className="fa fa-dot-circle-o" />
                  </span>
                </a>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <a className="button" onClick={() => this.handleClick('right')}>
                  <span className="icon">
                    <i className="fa fa-arrow-right" />
                  </span>
                </a>
              </div>
            </div>
          </nav>

          <div className="has-text-centered">
            <a className="button" onClick={() => this.handleClick('down')}>
              <span className="icon">
                <i className="fa fa-arrow-down" />
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(MoveArrow);
