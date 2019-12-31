import React, { Component } from 'react';

import '../../styles/boards.css';
import SideNav, { MenuIcon } from 'react-simple-sidenav';
import { Meteor } from 'meteor/meteor';
// import Popup from 'reactjs-popup';

class Subject extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      subjectId: props.subjectId,
      name: props.name,
      modules: [],
      moduleName: '',
      showNav: false,
      role: false,
      superSubjects: [],
    };

    this.handleModuleName = this.handleModuleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderBody() {
    return null;
  }

  renderButton() {
    return (
      <div className="button">
        <span>Add Module</span>
        <svg>
          <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
          <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
        </svg>
      </div>
    );
  }

  handleModuleName(event) {
    this.setState({
      subjectId: this.state.subjectId,
      name: this.state.name,
      moduleName: event.target.value,
      showNav: this.state.showNav,
    });
  }

  handleSubmit() {
    Meteor.call('addZModule', {
      subject: this.state.subjectId,
      name: this.state.moduleName,
      chapters: [],
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

  renderEdit() {
    return (
      <div className="container">
        <form className="login" onSubmit={this.handleSubmit}>
          <label htmlFor="name"><b>New Module Name</b></label>
          <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleModuleName} />
          <button type="submit" className="registerbtn">Add</button>

        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="home-page1 -padding-20">
        {this.renderBody()}
      </div>
    );
  }
}

export default Subject;
