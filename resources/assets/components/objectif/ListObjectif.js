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

  render() {
    return (
      <div id="landing">
        <section className="hero is-fullheight is-dark">
          <NavBarAccueil />
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              <div className="conteneur">
                <ItemList locked={true} />
                <ItemList locked={true} />
                <ItemList locked={false} />
                <ItemList locked={false} />
                <ItemList locked={false} />
                <ItemList locked={false} />
                <ItemList locked={false} />
                <ItemList locked={false} />
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
