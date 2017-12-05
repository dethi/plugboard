import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';

import ComponentAction from '../../actions/componentActions';

class Community extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      components: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.component !== this.props.component) {
      this.setState({ components: nextProps.component.shared });
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.dispatch(ComponentAction.getSharedComponentsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    const { components } = this.state;

    console.log(components);

    return (
      <div>
        <NavBar showControl={false} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    component: state.component
  };
};

Community.PropTypes = {
  component: PropTypes.object
};

export default connect(mapStateToProps)(Community);
