import React, {Component} from 'react';
import Header from '../Header.jsx';
import AbstractComponent from "../AbstractComponent";
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from "meteor/meteor";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'coconut',
            email: '',
            password: '',
            dob: '',
            city: '',
            school: {
                name: '',
                location: '',
            }
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeDob = this.handleChangeDob.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeSchoolName = this.handleChangeSchoolName.bind(this);
        this.handleChangeSchoolLocation = this.handleChangeSchoolLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value,
            email: this.state.email,
            password: this.state.password,
            dob: this.state.dob,
            city: this.state.city,
            school: {
                name: this.state.school.name,
                location: this.state.school.location
            }
        });
    }

    handleChangeEmail(event) {
        this.setState({
            name: this.state.name,
            email: event.target.value,
            password: this.state.password,
            dob: this.state.dob,
            city: this.state.city,
            school: {
                name: this.state.school.name,
                location: this.state.school.location
            }
        });
    }

    handleChangePassword(event) {
        this.setState({
            name: this.state.name,
            email: this.state.email,
            password: event.target.value,
            dob: this.state.dob,
            city: this.state.city,
            school: {
                name: this.state.school.name,
                location: this.state.school.location
            }
        });
    }

    handleChangeDob(event) {
        this.setState({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            dob: event.target.value,
            city: this.state.city,
            school: {
                name: this.state.school.name,
                location: this.state.school.location
            }
        });
    }

    handleChangeCity(event) {
        this.setState({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            dob: this.state.dob,
            city: event.target.value,
            school: {
                name: this.state.school.name,
                location: this.state.school.location
            }
        });
    }

    handleChangeSchoolName(event) {
        this.setState({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            dob: this.state.dob,
            city: this.state.city,
            school: {
                name: event.target.value,
                location: this.state.school.location
            }
        });
    }

    handleChangeSchoolLocation(event) {
        this.setState({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            dob: this.state.dob,
            city: this.state.city,
            school: {
                name: this.state.school.name,
                location: event.target.value
            }
        });
    }

    renderBody() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name"><b>Full Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" onChange={this.handleChangeName}/>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" onChange={this.handleChangeEmail}/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChangePassword}/>

                    <label htmlFor="dob"><b>Enter Date of Birth</b></label>
                    <input type="date" placeholder="Enter Date of Birth" name="dob" onChange={this.handleChangeDob}/>

                    <label htmlFor="city"><b>Enter Your City</b></label>
                    <input type="text" placeholder="Enter City" name="city" onChange={this.handleChangeCity}/>

                    <label htmlFor="schoolName"><b>Enter Your School Name</b></label>
                    <input type="text" placeholder="Enter School Name" name="schoolName" onChange={this.handleChangeSchoolName}/>

                    <label htmlFor="schoolLocation"><b>Enter SchoolLocation</b></label>
                    <input type="text" placeholder="Enter School Location" name="schoolLocation" onChange={this.handleChangeSchoolLocation}/>

                    <button type="submit" className="registerbtn">Register</button>

                </form>
            </div>
        )
    }


    render() {
        return (
            <div className="home-page -padding-20">
                <Header/>
                {this.renderBody()}
            </div>
        )
    }

    handleSubmit() {
        Accounts.createUser(this.state, (err, res) => {
            if (err) {
                console.log(err);
                alert("Something went wrong");
            } else {
                let userId = Meteor.user()._id;
                let dbObject = {
                    userId: userId,
                    fields: {
                        "dob": this.state.dob,
                        "city": this.state.city,
                        "school": {
                            "name":
                            this.state.school.name,
                            "location":
                            this.state.school.location
                        }
                    }
                };

                Meteor.call('extendProfile', dbObject, (err, res) => {
                        if (err) {
                            console.log(err);
                            alert('Failed to register');
                        } else {
                            alert("Successfully registered please verify your email!");
                            FlowRouter.go('/');
                        }
                    }
                );
            }
        });

        event.preventDefault();
    }
}

export default Home;
