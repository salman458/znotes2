import React, { Component } from 'react';
import '../../styles/cover.scss';
import { Accounts } from 'meteor/accounts-base';

class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  render() {
    return (
      <div className="home-page1 -padding-20">
        <div className="search__container -layout-v -center">
          <form onSubmit={this.handleSubmit}>
            <ul>
              <li><h1>Change Email Address</h1></li>
              <li>
                      <input
                className="search__input -full-width"
                type="email"
                placeholder="Please enter your new email"
                onChange={this.handleChangeEmail}
              />
                    </li>
              <li>
                      <button type="submit" className="searchBtn">Save</button>
                    </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit() {
    event.preventDefault();
    Meteor.call('removeEmail', Meteor.user(), (err, res) => {
      if (err) console.log(err);
      else {
        console.log(res);
        console.log(this.state);
        Meteor.call('addEmail', { user: Meteor.user(), email: this.state.email }, (err, res) => {
          if (err) console.log(err);
          else {
            Meteor.call('sendVerification', Meteor.user(), (err, res) => {
              if (err) console.log(err);
              else {
                alert('Email was successfully updated');
                console.log('Email was successfully updated');
                FlowRouter.go('/');
              }
            });
          }
        });
      }
    });
  }
}

export default ChangeEmail;
