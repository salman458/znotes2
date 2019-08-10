import React, {Component} from 'react';
import '../../client/styles/form.css';

export default class AccountsUI extends Component {
    renderLogin() {
        return (
            <div className="container">
                <form className="login">
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email"/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password"/>

                    <button type="submit" className="registerbtn">Login</button>

                    <div className="container signin">
                        <p>Forgot password? <a href="">reset password</a>. Or Create new account <a href="">sign up</a>. </p>
                    </div>

                </form>
            </div>
        );
    }

    render() {
        return <div className="form">
            {this.renderLogin()}
        </div>
    }
}

