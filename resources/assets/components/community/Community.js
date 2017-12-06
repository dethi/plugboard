import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import Element from './Element';

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
    const { loading, components } = this.state;

    console.log(components);

    return (
      <div>
        <NavBar showControl={false} />
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="profile container">
              <div className="has-text-centered title-community">
                <h1 className="title ">
                  Components shared by the commmunity
                </h1>
              </div>
            </div>
          </div>
        </section>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="list-elements list-shared-component">
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
                            onClickShare={() => this.onApply(element)}
                          />
                        ))}
                      </div>}
                </div>}
            </div>
          </div>
        </div>
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
