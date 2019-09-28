import React, {Component} from 'react';
import Header from '../Header.jsx';
import AbstractComponent from "../AbstractComponent";
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from "meteor/meteor";
import {confirmAlert} from 'react-confirm-alert'; // Import
import '../../../client/styles/consfirm.css'; // Import css

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'coconut',
            email: '',
            password: '',
            dob: '',
            birthPlace: '',
            city: '',
            gender: '',
            school: {
                name: '',
                location: '',
            }
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handelChangeGender = this.handelChangeGender.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeDob = this.handleChangeDob.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeBirthPlace = this.handleChangeBirthPlace.bind(this);
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

    reg = () => {
        confirmAlert({
            title: 'Registration',
            message: 'Please check your mailbox and verify your email',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        FlowRouter.go('/');
                        window.location.reload()
                    }
                }
            ]
        });
    };

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

    handelChangeGender(event) {
        this.setState({
            gender: event.target.value
        })
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

    handleChangeBirthPlace(event) {
        this.setState({
            birthPlace: event.target.value
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
            <div className="container -half-width -outer-center">
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="name"><b>Full Name</b></label>
                    <input type="text" placeholder="What is your name?" name="name" onChange={this.handleChangeName}/>

                    <label htmlFor="gender"><b>Please, enter your gender</b></label>
                    <br/>
                    <br/>
                    <input type="checkbox" name="vehicle1" value="Male"/><p>Male</p>
                    <br/>
                    <input type="checkbox" name="vehicle1" value="Female"/><p>Female</p>
                    <br/>
                    <input type="checkbox" name="vehicle1" value="Other"/><p>Other</p>
                    <br/>
                    <br/>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" onChange={this.handleChangeEmail}/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChangePassword}/>

                    <label htmlFor="dob"><b>Enter Date of Birth</b></label>
                    <input className="date" type="date" placeholder="Enter Date of Birth" name="dob" onChange={this.handleChangeDob}
                           style={{background: "#383838", border: "#383838"}}/>

                    <label htmlFor="city"><b>Where are you living? </b></label>
                    <input type="text" placeholder="country + city" name="city" onChange={this.handleChangeCity}/>

                    <label htmlFor="city"><b>Where were you born? (country + city)</b></label>
                    <input type="text" placeholder="country + city" name="city" onChange={this.handleChangeBirthPlace}/>

                    <label htmlFor="schoolName"><b>Enter Your School Name</b></label>
                    <input type="text" placeholder="Enter School Name" name="schoolName" onChange={this.handleChangeSchoolName}/>

                    <label htmlFor="schoolLocation"><b>Enter School Location</b></label>
                    <input type="text" placeholder="country + city" name="schoolLocation" onChange={this.handleChangeSchoolLocation}/>

                    <button type="submit" className="registerbtn">Register</button>
                    <button type="submit" className="registerbtn" onClick={this.handleHome}>Back To Home</button>


                </form>
            </div>
        )
    }

    handleHome() {
        FlowRouter.go('/');
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
                        "username": this.state.name,
                        "dob": this.state.dob,
                        "livingPlace": this.state.city,
                        "birthPlace": this.state.birthPlace,
                        "role": '',
                        "gender": this.state.gender,
                        "school": {
                            "name":
                            this.state.school.name,
                            "location":
                            this.state.school.location
                        },
                        "subjects": [],
                        "lastPositions": []
                    }
                };

                Meteor.call('extendProfile', dbObject, (err, res) => {
                        if (err) {
                            console.log(err);
                            alert('Failed to register');
                        } else {
                            // alert("Successfully registered please verify your email!");
                            this.reg();
                        }
                    }
                );
            }
        });

        event.preventDefault();
    }
}

export default Home;
