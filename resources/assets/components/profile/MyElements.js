import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ComponentAction from '../../actions/componentActions';

import Element from './Element';

class MyElements extends Component {
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

  render() {
    const { loading } = this.state;
    const { components } = this.props.component;

    return (
      <div>
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
                      selected={element.id === this.state.boardId}
                      onClick={() => this.selectBoard(element.id)}
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

MyElements.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(MyElements);
