import React, { Component } from 'react';
import A from '/client/components/pages/Explore';

import '../../styles/boards.css';
import { Meteor } from 'meteor/meteor';
// import Popup from 'reactjs-popup';

import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Explore extends Component {
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

  renderBody() {
    return (
      permission > 1 && this.renderAddBoardPopUp()
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
        <A />
        {/* {this.renderBody()} */}
      </div>
    );
  }
}

export default Explore;
