import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

class ObjectifInList extends Component {
  render() {
    const { maxCompletedObjectif } = this.props.objectif;

    const locked = this.props.id > maxCompletedObjectif.objectif_id + 1;
    const done = this.props.id <= maxCompletedObjectif.objectif_id;
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
                    'fa-check': this.props.id <=
                      maxCompletedObjectif.objectif_id,
                    'fa-unlock': this.props.id ===
                      maxCompletedObjectif.objectif_id + 1
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
