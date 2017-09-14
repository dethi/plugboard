import React, { Component } from 'react';
import { connect } from 'react-redux';

import componentApi from '../../api/component';
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
    componentApi.getComponents().then(elements => {
      console.log(elements);
      this.setState({
        elements: elements,
        loading: false
      });
    });
  }
  render() {
    const { elements, loading } = this.state;
    return (
      <div>
        {loading &&
          <div className="has-text-centered">
            <span className="icon is-large">
              <i className="fa fa-spinner fa-pulse" />
            </span>
          </div>}
        {elements &&
          <div>
            {elements.length === 0
              ? <div className="has-text-centered">
                  <div className="notification is-warning">
                    <p>You don't have any saved boards</p>
                  </div>
                </div>
              : <div className="parent">
                  {elements.map(element => (
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
    user: state.user
  };
};

export default connect(mapStateToProps)(MyElements);
