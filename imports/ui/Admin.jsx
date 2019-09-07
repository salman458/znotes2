import React, {Component} from 'react';
// import "react-mde/lib/styles/css/react-mde-all.css";
import "../../client/styles/table.css";

import Header from './Header.jsx';
import {Button} from "react-bootstrap";


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            students: [
                {id: 1, name: 'Wasif', email: 'wasif@email.com'},
                {id: 2, name: 'Ali', email: 'ali@email.com'},
                {id: 3, name: 'Saad', email: 'saad@email.com'},
                {id: 4, name: 'Asad', email: 'asad@email.com'}
            ]
        };
    }

    componentDidMount() {
        Meteor.call('getAllUsers', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                console.log('user', res);
                this.state.users = res.map(user => {
                    return <li key={user._id}>{user.username}</li>;
                });
                console.log('state', this.state);
            }
        })
    }

    submitRole() {

    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0]);
        let headerMap = header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
        headerMap.push(<th key={3}>Team</th>);
        headerMap.push(<th key={4}>Subject</th>);
        headerMap.push(<th key={4}></th>);
        return headerMap;
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const {id, name, email} = student //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td><input type="checkbox" name="vehicle1" value="Bike"/></td>
                    <td><select name="cars" multiple>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    </td>
                    <td><Button>Save</Button></td>
                </tr>
            )
        })
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
                </div>
            </div>

        )
    }


}


export default Admin;
