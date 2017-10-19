import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import ObjectifAction from '../../actions/objectifActions';
import ModalAction from '../../actions/modalActions';
import ObjectifInList from './ObjectifInList';

class ListObjectif extends Component {
  componentWillMount() {
    this.state = {
      loading: false
    };
    if (Object.keys(this.props.objectif).length === 0) {
      this.setState({ loading: true });
      this.props.dispatch(ObjectifAction.getObjectifsAsync()).then(() => {
        this.setState({
          loading: false
        });
      });
      this.props.dispatch(ObjectifAction.getMaxCompletedObjectifAsync());
    }
  }

  setCurrentObjectif = objectif => {
    this.props.dispatch(ObjectifAction.setCurrentObjectif(objectif));

    this.props.dispatch(ModalAction.displayModal('OBJECTIF_INFO'));
  };

  toggleQuickView = show => {
    this.props.dispatch(ObjectifAction.showQuickView(show));
  };

  render() {
    const { loading } = this.state;
    const {
      objectifs,
      maxCompletedObjectif,
      showQuickView
    } = this.props.objectif;
    return (
      <div
        id="quickviewDefault"
        className={classNames('quickview', {
          'is-active': showQuickView
        })}
      >
        <header className="quickview-header">
          <p className="title">Objectifs</p>
          <span
            className="delete"
            onClick={() => this.toggleQuickView(false)}
          />
        </header>

        <div className="quickview-body scrollable">
          <div className="quickview-block">
            {loading &&
              <div className="has-text-centered">
                <span className="icon is-large">
                  <i className="fa fa-spinner fa-pulse" />
                </span>
              </div>}
            <div className="columns is-multiline">
              {objectifs &&
                (maxCompletedObjectif === '' || maxCompletedObjectif) &&
                objectifs.map(objectif => (
                  <ObjectifInList
                    key={objectif.id}
                    id={objectif.id}
                    title={objectif.title}
                    locked={true}
                    onClick={() => this.setCurrentObjectif(objectif)}
                  />
                ))}
            </div>
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
