import React, { Component } from 'react';
import classNames from 'classnames';

class Element extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  handleApply = () => {
    if (this.props.onClickImport) {
      // Check if onApply return a Promise, if so display loader and hide only if promise is a success
      const res = this.props.onClickImport();
      if (res && typeof res.then === 'function') {
        this.setState({ loading: true });
        res
          .then(() => {
            this.setState({ loading: false });
          })
          .catch(() => {
            this.setState({ loading: false });
          });
        return;
      }
    }
  };
  render() {
    return (
      <div className="box">
        <article className="media">
          <div className="media-content">
            <figure className="image">
              <img src={this.props.img} alt="Board Preview" />
            </figure>
            <div className="content has-text-centered is-size-4	">
              <strong className="title">{this.props.title}</strong>
              {' '}
              by
              {' '}
              {this.props.name}
              <br />

              <a
                className={classNames(
                  'has-text-center',
                  'button',
                  'is-medium',
                  {
                    'component-already-imported': !this.props.originalComponent,
                    'is-info': this.props.originalComponent,
                    'is-primary': !this.props.originalComponent,
                    'is-loading': this.state.loading
                  }
                )}
                onClick={this.handleApply}
              >
                {this.props.originalComponent ? 'Import' : 'Imported'}
              </a>

            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Element;
