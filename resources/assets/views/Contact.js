import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4 is-offset-4">
              <div className="card is-fullwidth">
                <header className="card-header">
                  <p className="card-header-title">Contact</p>
                </header>

                <div className="card-content">
                  <div />
                  <div className="content">
                    <form
                      className="control"
                      role="form"
                      method="POST"
                      action="{{ url('/contact') }}"
                      id="contact_form"
                    >

                      <div className="field">
                        <div className="control has-icon">
                          <input
                            className="input {{ $errors->has('name') ? 'is-danger' : '' }}"
                            name="name"
                            value="{{ old('name') }}"
                            type="text"
                            placeholder="Name"
                            required
                            autoFocus
                          />

                          <span className="icon is-small">
                            <i className="fa fa-user" />
                          </span>

                        </div>
                      </div>

                      <div className="field">
                        <div className="control has-icon">
                          <input
                            className="input {{ $errors->has('email') ? 'is-danger' : '' }}"
                            name="email"
                            value="{{ old('email') }}"
                            type="email"
                            placeholder="Email"
                            required
                            autoFocus
                          />

                          <span className="icon is-small">
                            <i className="fa fa-envelope" />
                          </span>

                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <input
                            className="input {{ $errors->has('subject') ? 'is-danger' : '' }}"
                            name="subject"
                            value="{{ old('subject') }}"
                            type="text"
                            placeholder="Subject"
                            required
                            autoFocus
                          />

                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <textarea
                            className="textarea {{ $errors->has('message') ? 'is-danger' : '' }}"
                            form="contact_form"
                            name="message"
                            placeholder="Enter your message here..."
                            required
                            autoFocus
                          />

                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <button
                            className="button is-primary is-fullwidth uppercase"
                            type="submit"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default () => <Contact />;
