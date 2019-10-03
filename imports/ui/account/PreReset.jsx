import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss"
import {Accounts} from "meteor/accounts-base";

class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    renderBody() {
        return (
            <div className="search__container -half-width -outer-center ">
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        <li><h1>Reset Password</h1></li>
                        <li><input className="search__input -full-width" type="text" placeholder="Please enter your email"
                                   onChange={this.handleChangeEmail}/></li>
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
        Accounts.forgotPassword({email: this.state.email}, (error) => {
            if (error) {
                alert("Failed to reset the password");
                console.log(error);
                FlowRouter.go('/');
            } else {
                alert("Reset link is sent to the provided email");
                FlowRouter.go('/');
            }
        });
    }
}

export default Reset;
