import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ObjectifAction from '../../actions/objectifActions';
import ItemList from './ItemList';
import NavBarAccueil from '../home/NavBarAccueil';

class ListObjectif extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.dispatch(ObjectifAction.getObjectifsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  setCurrentObjectif = objectif => {
    console.log('1');
    this.props.dispatch(ObjectifAction.setCurrentObjectif(objectif));
  };
  render() {
    const { loading } = this.state;
    const { objectifs } = this.props.objectif;
    return (
      <div id="landing">
        <section className="hero is-fullheight is-dark">
          <NavBarAccueil />
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              {loading &&
                <div className="has-text-centered">
                  <span className="icon is-large">
                    <i className="fa fa-spinner fa-pulse" />
                  </span>
                </div>}
              <div className="conteneur">
                {objectifs &&
                  objectifs.map(objectif => (
                    <ItemList
                      key={objectif.id}
                      title={objectif.title}
                      locked={true}
                      onClick={() => {
                        console.log('coucou');
                        this.setCurrentObjectif(objectif);
                      }}
                    />
                  ))}

              </div>
            </div>
          </div>
        </section>
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
