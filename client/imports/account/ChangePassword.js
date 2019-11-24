import React, { Component } from 'react';
import Header from '../Header';
import '../../styles/cover.scss';
import { Accounts } from 'meteor/accounts-base';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
    this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeOldPassword(event) {
    this.setState({
      oldPassword: event.target.value,
      newPassword: this.state.newPassword,
    });
  }

  handleChangeNewPassword(event) {
    this.setState({
      oldPassword: this.state.oldPassword,
      newPassword: event.target.value,
    });
  }

  render() {
    return (
      <div className="home-page1 -padding-20">
        <div className="search__container -layout-v -center">
          <form onSubmit={this.handleSubmit}>
            <ul>
            <li><h1>Change Password</h1></li>
            <li>
              <input
                className="search__input -full-width"
                type="password"
                placeholder="old password"
                onChange={this.handleChangeOldPassword}
              />
            </li>

            <li>
              <input
                className="search__input -full-width"
                type="password"
                placeholder="new password"
                onChange={this.handleChangeNewPassword}
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
    Accounts.changePassword(this.state.oldPassword, this.state.newPassword, (error) => {
      if (error) {
        alert('Failed to change password');
        console.log(error);
      } else {
        alert('Password successfully updated');
        FlowRouter.go('/');
      }
    });
  }
}

export default ChangePassword;
