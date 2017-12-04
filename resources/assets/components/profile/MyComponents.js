import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ComponentAction from '../../actions/componentActions';
import componentApi from '../../api/component';
import Element from './Element';

class MyComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.dispatch(ComponentAction.getComponentsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  onDelete = id => {
    componentApi
      .deleteComponent(id)
      .then(() => {
        this.setState({ success: 'Component deleted!' });
        this.setState({ loading: true });
        this.props.dispatch(ComponentAction.getComponentsAsync()).then(() => {
          this.setState({
            loading: false
          });
        });
      })
      .catch(response => {
        if (response.status === 422) {
          const errFormat = [];
          Object.values(response.data).forEach(err => errFormat.push(err[0]));
          this.setState({ err: 'An error occured' });
        }
        if (response.status === 401) {
          this.setState({ err: [response.data.status] });
        }
      });
  };

  render() {
    const { loading } = this.state;
    const { components } = this.props.component;

    return (
      <div className="list-element-profile">
        {this.state.success &&
          <div className="notification is-primary">
            <p>{this.state.success}</p>
          </div>}
        {this.state.err &&
          <div className="notification is-danger">
            {<p>this.state.err</p>}
          </div>}
        {loading &&
          <div className="has-text-centered">
            <span className="icon is-large">
              <i className="fa fa-spinner fa-pulse" />
            </span>
          </div>}
        {components &&
          <div>
            {components.length === 0
              ? <div className="has-text-centered">
                  <div className="notification is-warning">
                    <p>You don't have any saved components</p>
                  </div>
                </div>
              : <div className="parent">
                  {components.map(element => (
                    <Element
                      key={element.id}
                      title={element.title}
                      img={element.preview_url}
                      onDelete={() => this.onDelete(element.id)}
                    />
                  ))}
                </div>}
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    component: state.component
  };
};

MyComponents.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(MyComponents);
