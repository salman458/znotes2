import React, {Component} from 'react';
import '../../../client/styles/form.css';
import {Meteor} from "meteor/meteor";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

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

    renderLogin() {
        if (Meteor.user()) {
            return (
                <div className="container">
                    <form>
                        <button onClick={this.ChangeEmail} className="accountEditBtn">Change Email</button>
                        <button onClick={this.ChangePassword} className="accountEditBtn">Change Password</button>
                        <button onClick={this.handleLogout} type="submit" className="registerbtn">Log out</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <form className="login" onSubmit={this.handleSubmit}>
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="email" placeholder="Enter Email" name="email" onChange={this.handleChangeEmail}/>

                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChangePassword}/>

                        <button type="submit" className="registerbtn">Login</button>

                        <div className="container signin">
                            <p>Forgot password? <a href="#" onClick={this.handleReset}>reset password</a>. Or Create new account <a href="#"
                                                                                                                                    onClick={this.handleRegister}>sign
                                up</a>. </p>
                        </div>

                    </form>
                </div>
            );
        }
    }

    ChangeEmail() {
        FlowRouter.go('/email/change');
    }

    ChangePassword() {
        FlowRouter.go('/password/change');
    }

    handleReset() {
        FlowRouter.go('/password/reset');
    }

    handleRegister() {
        FlowRouter.go('/register');
    }

    handleSubmit() {
        Meteor.loginWithPassword(this.state.email, this.state.password, (error => {
            if (error)
                console.log(error);
            else {
                alert("Successfully logged in!");
                FlowRouter.go('/');
            }
        }));
        event.preventDefault();
    }

    handleLogout() {
        event.preventDefault();
        Meteor.logout();
        alert("Are you sure that you want to log out?");
        FlowRouter.go('/');
    }

    render() {
        return <div className="form">
            {this.renderLogin()}
        </div>
    }
}

