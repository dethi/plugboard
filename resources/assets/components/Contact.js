import React, { Component } from 'react';

export default class Contact extends Component {
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
                      id="contact_form"
                    >

                      <div className="field">
                        <div className="control has-icon">
                          <input
                            className="input"
                            name="name"
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
                            className="input"
                            name="email"
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
                            className="input"
                            name="subject"
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
                            className="textarea"
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
