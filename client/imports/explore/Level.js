import React, { Component } from 'react';

import '../../styles/boards.css';
import { Meteor } from 'meteor/meteor';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Level extends Component {
  handleLevels(levels) {
    this.setState({
      boardId: this.state.boardId,
      levels,
      newName: this.state.newName,
    });
  }

  handleLevelName(event) {
    this.setState({
      boardId: this.state.boardId,
      levels: this.state.levels,
      newName: event.target.value,
    });
  }

  componentDidMount() {

  }

  handleSubmit() {
    Meteor.call('addLevel', { board: this.state.boardId, name: this.state.newName }, (err, res) => {
      if (err) {
        console.log(err);
        alert('Failed to add new level');
      } else {
        console.log(res);
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
        <span>Add Level</span>
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
          <label htmlFor="name"><b>Level Name</b></label>
          <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleLevelName} />
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

export default Level;
