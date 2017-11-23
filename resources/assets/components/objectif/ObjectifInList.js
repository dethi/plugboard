import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

class ObjectifInList extends Component {
  render() {
    const { scores } = this.props.objectif;
    const done = this.props.score !== null;
    const unlocked = (scores.length === 0 && this.props.id === 1) ||
      (scores.length !== 0 &&
        this.props.id === scores[scores.length - 1].objectif_id + 1);
    const locked = !done && !unlocked;
    return (
      <div className="column is-10 is-offset-1 ">
        <a
          className={classNames('box', 'has-ribbon-left', {
            'objectif-locked': locked
          })}
          onClick={!locked && this.props.onClick}
        >
          {done &&
            <div className="ribbon is-primary is-small">
              {this.props.score}
            </div>}
          <article className="media">
            <div className="media-left">
              <span className="icon is-large">
                <i
                  className={classNames('fa', {
                    'fa-lock': locked,
                    'fa-check': done,
                    'fa-unlock': unlocked
                  })}
                />
              </span>
            </div>
            <div className="media-content on-bottom">
              <div className="title has-text-centered">
                {this.props.title}
              </div>
            </div>
          </article>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    objectif: state.objectif
  };
};

ObjectifInList.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifInList);
