import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../../styles/form.css';
import '../../styles/consfirm.css'; // Import css

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: false,
    };
  }

  componentDidMount() {
    if (Meteor.userId()) {
      Meteor.call('findUserRole', Meteor.userId(), (err, role) => {
        if (err) { console.log(err); } else if (role[0].role === 'team') {
          this.setState({ role: true });
        }
      });
    }
  }

    logout = () => {
      confirmAlert({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.handleLogout(),
          },
          {
            label: 'No',
            onClick: () => FlowRouter.go('/'),
          },
        ],
      });
    };

    wrongPassword = () => {
      confirmAlert({
        title: 'LogIn',
        message: 'The password that you have entered is wrong please try again',
        buttons: [
          {
            label: 'Retry',
            onClick: () => {

            },
          }, {
            label: 'Cancel',
            onClick: () => {
              FlowRouter.go('/');
              window.location.reload();
            },
          },
        ],
      });
    };

    handleChangeEmail(event) {
      this.setState({
        email: event.target.value,
        password: this.state.password,
      });
    }

    handleChangePassword(event) {
      this.setState({
        email: this.state.email,
        password: event.target.value,
      });
    }

    adminHandler() {
      FlowRouter.go('/admin/0/20');
    }

    renderLogin() {
      if (Meteor.user()) {
        if (Meteor.userId() === '') {
          return (
            <div className="container">
              <button onClick={this.ChangeEmail} className="accountEditBtn">Change Email</button>
              <button onClick={this.ChangePassword} className="accountEditBtn">Change Password</button>
              <button onClick={this.adminHandler} className="accountEditBtn">Admin Page</button>
              <button onClick={this.addBio} type="submit" className="accountEditBtn">Add Bio</button>
              <button onClick={this.logout} type="submit" className="registerbtn">Log out</button>

            </div>
          );
        } if (this.state.role) {
          return (
            <div className="container">
              <button onClick={this.ChangeEmail} className="accountEditBtn">Change Email</button>
              <button onClick={this.ChangePassword} className="accountEditBtn">Change Password</button>
              <button onClick={this.addBio} type="submit" className="accountEditBtn">Add Bio</button>
              <button onClick={this.logout} type="submit" className="registerbtn">Log out</button>
            </div>
          );
        }
        return (
          <div className="container">
            <button onClick={this.ChangeEmail} className="accountEditBtn">Change Email</button>
            <button onClick={this.ChangePassword} className="accountEditBtn">Change Password</button>
            <button onClick={this.logout} type="submit" className="registerbtn">Log out</button>
          </div>
        );
      }
      return (
        <div className="container">
          <form className="login" onSubmit={this.handleSubmit}>
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" onChange={this.handleChangeEmail} />

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChangePassword} />

            <button type="submit" className="registerbtn">Login</button>

            <div className="container signin">
. Or Create new account
                {' '}
                <a
                  href="#"
                  onClick={this.handleRegister}
                >
sign
                                up

                </a>
.
                {' '}

              </p>
            </div>

          </form>
        </div>
      );
    }

    addBio() {
      FlowRouter.go('/addBio');
    }

    ChangeEmail() {
      FlowRouter.go('/email/change');
    }

    ChangePassword() {
      FlowRouter.go('/password/change');
    }

    // handleReset() {
    //   FlowRouter.go('/password/reset');
    // }

    // handleRegister() {
    //   FlowRouter.go('/register');
    // }

    handleLogout() {
      Meteor.logout();
      FlowRouter.go('/');
      window.location.reload();
    }

    render() {
      return (
        <div className="form">
          {this.renderLogin()}
        </div>
      );
    }
}
