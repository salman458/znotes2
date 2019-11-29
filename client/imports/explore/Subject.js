import React, { Component } from 'react';


import '../../styles/boards.css';
import { Meteor } from 'meteor/meteor';
// import Popup from 'reactjs-popup';

import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Subject extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      boardId: props.boardId,
      levelId: props.levelId,
      subjects: [],
      newName: '',
      newColor: '',
      role: false,
    };

    this.handleSubjects = this.handleSubjects.bind(this);
    this.handleSubjectName = this.handleSubjectName.bind(this);
    this.handleSubjectColor = this.handleSubjectColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  componentDidMount() {
    console.log(this.state);
    Meteor.call('loadSubjects', { board: this.state.boardId, level: this.state.levelId }, (err, res) => {
      if (err) {
        console.log(err);
        alert('Failed to load levels');
      } else {
        console.log(res);
        let index = 0;
        const tmp = [];
        res.forEach((subject) => {
          tmp.push(
            <Slide index={index++}>
              <div className="container1">
                <a className="subject" href={`/explore/module/${subject.name}/${subject._id}`}>{subject.name}</a>
              </div>
            </Slide>,
          );
        });

        this.setState({ subjects: tmp });

        if (Meteor.userId()) {
          Meteor.call('findUserRole', Meteor.userId(), (err, role) => {
            if (err) console.log(err);
            else if (role[0].role === 'team') this.setState({ role: true });
          });
        }
      }
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
    console.log(this.state.subjects);
    if (Meteor.userId()) {
      if (this.state.role) {
        return (
          <div className="containerRes1">
            <h1 style={{ color: 'white' }}><b>Subjects</b></h1>
            {this.renderAddBoardPopUp()}
            <CarouselProvider
              naturalSlideWidth={50}
              naturalSlideHeight={25}
              totalSlides={this.state.subjects.length}
              visibleSlides={4}
            >
              <Slider>
                {this.state.subjects}
              </Slider>
              {/* <ButtonBack>Back</ButtonBack> */}
              {/* <ButtonNext>Next</ButtonNext> */}
            </CarouselProvider>
          </div>
        );
      }
      return (
        <div className="containerRes1">
          <h1 style={{ color: 'white' }}><b>Subjects</b></h1>
          <CarouselProvider
            naturalSlideWidth={50}
            naturalSlideHeight={25}
            totalSlides={this.state.subjects.length}
            visibleSlides={4}
          >
            <Slider>
              {this.state.subjects}
            </Slider>
            {/* <ButtonBack>Back</ButtonBack> */}
            {/* <ButtonNext>Next</ButtonNext> */}
          </CarouselProvider>
        </div>
      );
    }
    return (
      <div className="containerRes1">
        <h1 style={{ color: 'white' }}><b>Boards</b></h1>
        <CarouselProvider
          naturalSlideWidth={50}
          naturalSlideHeight={25}
          totalSlides={this.state.subjects.length}
          visibleSlides={4}
        >
          <Slider>
            {this.state.subjects}
          </Slider>
          {/* <ButtonBack>Back</ButtonBack> */}
          {/* <ButtonNext>Next</ButtonNext> */}
        </CarouselProvider>
      </div>
    );
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
