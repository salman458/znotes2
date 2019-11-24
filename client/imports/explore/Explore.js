import React, { Component } from 'react';
import '../../styles/cover.scss';
import '../../styles/scroller.css';
import '../../styles/boards.css';
import { Meteor } from 'meteor/meteor';
import Popup from 'reactjs-popup';

import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import Header from '../Header';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      newName: '',
      role: false,
    };
    this.handleBoardName = this.handleBoardName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBoardName(event) {
    this.setState({
      boards: this.state.boards,
      newName: event.target.value,
    });
  }

  handleSubmit() {
    Meteor.call('addBoard', { name: this.state.newName }, (err, res) => {
      if (err) {
        console.log(err);
        alert('Failed to add new board');
      } else {
        console.log(res);
        alert('Successfully added new board!');
        FlowRouter.go('/explore');
      }
    });
  }

  componentDidMount() {
    Meteor.call('loadBoards', {}, (err, res) => {
      if (err) {
        console.log(err);
        alert('Failed to load boards');
      } else {
        let index = 0;
        const tmp = [];
        res.forEach((board) => {
          tmp.push(
            <Slide index={index++}>
              <div className="container1">
                <a className="subject" href={`/explore/level/${board._id}`}>
                  {board.name}
                </a>
              </div>
            </Slide>,
          );
        });
        this.setState({ boards: tmp });
      }
    });
    if (Meteor.user()) {
      Meteor.call('findUserRole', Meteor.userId(), (err, role) => {
        if (err) console.log(err);
        else if (role[0].role === 'team') this.setState({ role: true });
      });
    }
    console.log();
  }

  renderBody() {
    if (Meteor.userId()) {
      if (this.state.role) {
        return (
          <div className="containerRes1">
            <h1>Boards</h1>
            {this.renderAddBoardPopUp()}
            <CarouselProvider
              naturalSlideWidth={50}
              naturalSlideHeight={25}
              totalSlides={this.state.boards.length}
              visibleSlides={4}
            >
              <Slider>
                {this.state.boards}
              </Slider>
              {/* <ButtonBack>Back</ButtonBack> */}
              {/* <ButtonNext>Next</ButtonNext> */}
            </CarouselProvider>
          </div>
        );
      }
      return (
        <div className="containerRes1">
          <h1>Boards</h1>
          <CarouselProvider
            naturalSlideWidth={50}
            naturalSlideHeight={25}
            totalSlides={this.state.boards.length}
            visibleSlides={4}
          >
            <Slider>
              {this.state.boards}
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
          totalSlides={this.state.boards.length}
          visibleSlides={4}
        >
          <Slider>
            {this.state.boards}
          </Slider>
          {/* <ButtonBack>Back</ButtonBack> */}
          {/* <ButtonNext>Next</ButtonNext> */}
        </CarouselProvider>
      </div>
    );
  }

  renderAddBoardPopUp() {
    return (
      <Popup trigger={this.renderButton} modal>
        {(close) => (
          <div className="modal">
            <a className="close" onClick={close}>
                            &times;
            </a>
            {this.renderEdit()}
          </div>
        )}

      </Popup>
    );
  }

  renderButton() {
    return (
      <div className="button">
        <span>Add Board</span>
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
          <label htmlFor="name"><b>New Board Name</b></label>
          <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleBoardName} />
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

export default Explore;
