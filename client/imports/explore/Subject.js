import React, { Component } from 'react';

import '../../styles/boards.css';
import { Meteor } from 'meteor/meteor';
// import Popup from 'reactjs-popup';

import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Subject extends Component {
  handleSubjects(subjects) {
    this.setState({
      boardId: this.state.boardId,
      levelId: this.state.levelId,
      subjects,
      newName: this.state.newName,
      newColor: this.state.newColor,
    });
  }

  handleSubjectName(event) {
    this.setState({
      boardId: this.state.boardId,
      levelId: this.state.levelId,
      newName: event.target.value,
      newColor: this.state.newColor,
    });
  }

  handleSubjectColor(event) {
    this.setState({
      boardId: this.state.boardId,
      levelId: this.state.levelId,
      newName: this.state.newName,
      newColor: event.target.value,
    });
  }

  handleSubmit() {
    Meteor.call('addSubject', {
      board: this.state.boardId,
      level: this.state.levelId,
      name: this.state.newName,
      color: this.state.color,
    }, (err, res) => {
      if (err) {
        console.log(err);
        alert('Failed to add new subject');
      } else {
        console.log(res);
        alert('Successfully added new subject!');
      }
    });
  }

  renderBody() {
    { this.renderAddBoardPopUp(); }
  }

  renderAddBoardPopUp() {
    return null;
    // return (
    //   <Popup trigger={this.renderButton} modal>
    //     {(close) => (
    //       <div className="modal">
    //         <a className="close" onClick={close}>
    //                         &times;
    //         </a>
    //         {this.renderEdit()}
    //       </div>
    //     )}

    //   </Popup>
    // );
  }

  renderButton() {
    return (
      <div className="button">
        <span>Add Subject</span>
        <svg>
          <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
          <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
        </svg>
      </div>
    );
  }

  renderEdit() {
    return (
      <div className="container">
        <form className="login" onSubmit={this.handleSubmit}>
          <label htmlFor="name"><b>New Subject Name</b></label>
          <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleSubjectName} />
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
