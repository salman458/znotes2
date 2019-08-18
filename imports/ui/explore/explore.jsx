import React from 'react';
import Header from '../Header.jsx';
import AbstractComponent from "../AbstractComponent";
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import {Meteor} from "meteor/meteor";
import Popup from "reactjs-popup";


class Home extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            boards: '',
            newName: ''
        };
        this.handleBoards = this.handleBoards.bind(this);
        this.handleBoardName = this.handleBoardName.bind(this);
    }

    handleBoards(boards) {
        this.setState({
            boards: boards,
            newName: this.state.newName
        })
    }

    handleBoardName(event) {
        this.setState({
            boards: this.state.boards,
            newName: event.target.value
        })
    }

    handleSubmit() {
        Meteor.call('addBoard', {name: this.state.newName}, (err, res) => {
            if (err) {
                console.log(err);
                alert('Failed to add new board');
            } else {
                console.log(res);
                alert('Successfully added new board!');
                FlowRouter.go('/explore');
            }
        })
    }

    componentDidMount() {
        Meteor.call('loadBoards', {}, (err, res) => {
                if (err) {
                    console.log(err);
                    alert('Failed to load boards');
                } else {
                    this.handleBoards(res.map((board) => {
                        return <li key={board.name}><a href=""> {board.name}</a></li>;
                    }));
                }
            }
        );
    }


    renderBody() {
        console.log(this.state.boards);
        return (
            <div className="containerRes">
                <ul>
                    {this.state.boards}
                </ul>
            </div>
        )
    }

    renderAddBoardPopUp() {
        return (
            <Popup trigger={this.renderButton} modal>
                {close => (
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
        return (<div className="button">
            <span>Add Board</span>
            <svg>
                <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
            </svg>
        </div>);

    }


    renderEdit() {
        return (
            <div className="container">
                <form className="login" onSubmit={this.handleSubmit}>
                    <label htmlFor="name"><b>New Board Name</b></label>
                    <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleBoardName}/>
                    <button type="submit" className="registerbtn">Add</button>

                </form>
            </div>
        );
    }

    render() {

        return (
            <div className="home-page -padding-20">
                <Header/>
                {this.renderBody()}
                {this.renderAddBoardPopUp()}
            </div>
        )
    }

}


export default Home;
