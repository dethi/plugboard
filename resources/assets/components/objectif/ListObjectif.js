import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import ObjectifAction from '../../actions/objectifActions';
import ModalAction from '../../actions/modalActions';
import ObjectifInList from './ObjectifInList';

class ListObjectif extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.state = {
      loading: false
    };
    if (Object.keys(this.props.objectif).length === 0) {
      this.setState({ loading: true });
      this.props.dispatch(ObjectifAction.getObjectifsAsync()).then(() => {
        this.props.dispatch(ObjectifAction.getScoresAsync()).then(() => {
          this.setState({
            loading: false
          });
        });
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setObjectifForModalInfo = objectif => {
    this.props.dispatch(ObjectifAction.setObjectifForModalInfo(objectif));
    this.props.dispatch(ModalAction.displayModal('OBJECTIF_INFO_START'));
  };

  toggleQuickView = show => {
    this.props.dispatch(ObjectifAction.showQuickView(show));
  };

  /**
     * Alert if clicked on outside of element
     */
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      const {
        showQuickView
      } = this.props.objectif;
      if (showQuickView)
        this.props.dispatch(ObjectifAction.showQuickView(false));
    }
  };

  /**
     * Set the wrapper ref
     */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  render() {
    const { loading } = this.state;
    const {
      objectifs,
      showQuickView,
      scores
    } = this.props.objectif;

    return (
      <div
        ref={this.setWrapperRef}
        id="quickviewDefault"
        className={classNames('quickview', {
          'is-active': showQuickView
        })}
      >
        <header className="quickview-header">
          <p className="title">Goals</p>
          <span
            className="delete"
            onClick={() => this.toggleQuickView(false)}
          />
        </header>

        <div className="quickview-body scrollable">
          <div className="quickview-block">
            {loading
              ? <div className="has-text-centered">
                  <span className="icon is-large">
                    <i className="fa fa-spinner fa-pulse" />
                  </span>
                </div>
              : <div className="columns is-multiline">
                  {objectifs &&
                    objectifs.map(objectif => (
                      <ObjectifInList
                        key={objectif.id}
                        id={objectif.id}
                        title={objectif.title}
                        score={
                          scores[objectif.id - 1]
                            ? scores[objectif.id - 1].score
                            : null
                        }
                        onClick={() => this.setObjectifForModalInfo(objectif)}
                      />
                    ))}
                </div>}
          </div>
        </div>

        <footer className="quickview-footer" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    objectif: state.objectif
  };
};

ListObjectif.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ListObjectif);
