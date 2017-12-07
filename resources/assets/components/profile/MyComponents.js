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
      loading: false,
      components: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.component !== this.props.component) {
      this.setState({ components: nextProps.component.components });
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.dispatch(ComponentAction.getComponentsAsync()).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  onDelete = element => {
    componentApi
      .deleteComponent(element.id)
      .then(() => {
        this.setState({ success: element.title + ' deleted!' });

        const components = this.state.components;
        const indexToDelete = components.findIndex(
          component => component.id === element.id
        );
        components.splice(indexToDelete, 1);
        this.setState({ components: components });

        console.log(components);

        //this.props.dispatch(ComponentAction.getComponentsAsync());
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
  onApply = element => {
    if (element === null) return;

    componentApi.shareComponent(element.id, !element.share);

    const components = this.state.components;
    Object.keys(components).forEach(id => {
      const com = components[id];
      if (com.id === element.id) components[id].share = !element.share;
    });

    this.setState({ components: components });
  };

  onCloseNotif = type => {
    if (type === 0) this.setState({ success: '' });
    else this.setState({ err: '' });
  };

  render() {
    const { loading, components } = this.state;
    console.log(components);

    return (
      <div className="list-elements">
        {this.state.success &&
          <div className="notification is-primary">
            <button onClick={() => this.onCloseNotif(0)} className="delete" />
            <p>{this.state.success}</p>
          </div>}
        {this.state.err &&
          <div className="notification is-danger">
            <button onClick={() => this.onCloseNotif(1)} className="delete" />
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
                      isElement={true}
                      share={Boolean(element.share) === true}
                      onClickDelete={() => this.onDelete(element)}
                      onClickShare={
                        element.originalId === 0
                          ? () => this.onApply(element)
                          : null
                      }
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
