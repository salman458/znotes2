import React, {Component} from 'react';
// import "react-mde/lib/styles/css/react-mde-all.css";
import "../../client/styles/table.css";

import Header from './Header.jsx';
import {Button} from "react-bootstrap";
import Select from "react-dropdown-select";
import {Meteor} from "meteor/meteor";


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            subjects: [],
            subjectPermissions: '',
            isTeam: false,
            limit: props.limit,
            offset: props.offset
        };

        this.submitRole = this.submitRole.bind(this);
        this.checkBoxHandler = this.checkBoxHandler.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    componentDidMount() {
        Meteor.call('getAllUsers', {limit: this.state.limit, offset: this.state.offset}, (err, res) => {
            if (err)
                console.log(err);
            else {
                console.log('user', res);
                this.setState({
                    users: res.map(user => {
                        return {
                            id: user._id,
                            name: user.username,
                            email: user.emails[0].address
                        }
                    })
                });
                console.log('state', this.state);
            }
        });
        Meteor.call('getAllSubjects', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                this.setState({
                    subjects: res.map(subject => {
                        return {
                            label: subject.name,
                            value: subject._id
                        }
                    })
                });
                console.log('subjects', this.state);
            }
        });
    }


    renderTableHeader() {
        let headerMap = [];
        headerMap.push(<th key={0}>Id</th>);
        headerMap.push(<th key={1}>Name</th>);
        headerMap.push(<th key={2}>Email</th>);
        headerMap.push(<th key={3}>Team</th>);
        headerMap.push(<th key={4}>Subject</th>);
        headerMap.push(<th key={4}></th>);
        return headerMap;
    }

    renderTableData() {
        return this.state.users.map((user, index) => {
            const {id, name, email} = user; //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td><input onChange={this.checkBoxHandler} type="checkbox" name="vehicle1" value="true"/></td>
                    <td>
                        <Select multi={true} options={
                            this.state.subjects
                        } onChange={(values) => {
                            this.state.subjectPermissions = values;
                        }}/>
                    </td>
                    <td><Button id={id} onClick={this.submitRole}>Save</Button></td>
                </tr>
            )
        })
    }

    checkBoxHandler(event) {
        this.state.isTeam = event.target.value;
    }

    submitRole(event) {
        let role;
        let userId = event.target.id;
        let subjects = this.state.subjectPermissions;
        if (this.state.isTeam)
            role = 'team';
        this.updatedAccountPermission(userId, role, subjects);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div>
                        <h1 id='title'>All users</h1>
                        <table id='students'>
                            <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <ul>
                        <li><Button onClick={this.next}>Next</Button></li>
                        <li><Button onClick={this.previous}>Previous</Button></li>
                    </ul>
                </div>
            </div>

        )
    }

    next() {
        FlowRouter.go('/admin/' + Number(Number(this.state.offset) + Number(this.state.limit)) + '/' + this.state.limit);
        window.location.reload();

    }

    previous() {
        FlowRouter.go('/admin/' + Number(Number(this.state.offset) - Number(this.state.limit)) + '/' + this.state.limit);
        window.location.reload();
    }

    updatedAccountPermission(userId, role, subjects) {
        let dbObject = {
            userId: userId,
            fields: {
                "role": role,
                "sucjects": subjects,
            }
        };
        Meteor.call('extendProfile', dbObject, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    alert("Success");

                }
            }
        );
    }


}


export default Admin;
