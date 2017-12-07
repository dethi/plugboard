import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import Element from './Element';

import ComponentAction from '../../actions/componentActions';
import componentApi from '../../api/component';

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
      this.setState({ sharedComponents: nextProps.component.shared });
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.dispatch(ComponentAction.getSharedComponentsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });

    this.props.dispatch(ComponentAction.getComponentsAsync());
  }

  onApply = element => {
    if (element === null) return;

    componentApi.importComponent(element.id).then(() => {
      this.setState({ success: element.title + ' imported!' });
      this.props.dispatch(ComponentAction.getComponentsAsync());
    });
  };

  onCloseNotif = type => {
    if (type === 0) this.setState({ success: '' });
    else this.setState({ err: '' });
  };

  render() {
    const { loading, sharedComponents, components } = this.state;
    //components.find(component => component.)

    console.log(this.state);

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
              {this.state.success &&
                <div className="notification is-primary">
                  <button
                    onClick={() => this.onCloseNotif(0)}
                    className="delete"
                  />
                  <p>{this.state.success}</p>
                </div>}
              {this.state.err &&
                <div className="notification is-danger">
                  <button
                    onClick={() => this.onCloseNotif(1)}
                    className="delete"
                  />
                  {<p>this.state.err</p>}
                </div>}
              {loading &&
                <div className="has-text-centered">
                  <span className="icon is-large">
                    <i className="fa fa-spinner fa-pulse" />
                  </span>
                </div>}
              {sharedComponents &&
                <div>
                  {sharedComponents.length === 0
                    ? <div className="has-text-centered">
                        <div className="notification is-warning">
                          <p>There is not components to import. Share yours!</p>
                        </div>
                      </div>
                    : <div className="parent">
                        {sharedComponents.map(element => (
                          <Element
                            key={element.id}
                            title={element.title}
                            img={element.preview_url}
                            onClickShare={() => this.onApply(element)}
                            name={element.name}
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
