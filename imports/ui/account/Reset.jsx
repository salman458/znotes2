import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss"
import {Accounts} from "meteor/accounts-base";

class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            token: props.token
        };
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }



    renderBody() {
        return (
            <div className="search__container -layout-v -center">
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        <li><h1>Password reset</h1></li>
                        <li><input className="search__input -full-width" type="password" placeholder="Please enter your new password"
                                   onChange={this.handleChangePassword}/></li>
                        <li>
                            <button type="submit" className="searchBtn">Save</button>
                        </li>
                    </ul>
                </form>
            </div>


        )
    }


    render() {
        return (
            <div className="home-page1 -padding-20">
                <Header/>
                {this.renderBody()}
            </div>
        )
    }

    handleSubmit() {
        event.preventDefault();
        Accounts.resetPassword(this.state.token, this.state.password, (error) => {

            if (error) {
                alert("Failed to set new password");
                console.log(error);
                FlowRouter.go('/');
            } else {
                alert("new password is successfully set");
                FlowRouter.go('/');
            }
        })
    }
}

export default Reset;
