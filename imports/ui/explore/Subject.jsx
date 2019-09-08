import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import {Meteor} from "meteor/meteor";
import Popup from "reactjs-popup";


class Subject extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            boardId: props.boardId,
            levelId: props.levelId,
            subjects: '',
            newName: '',
            newColor: '',
            role: false
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
            subjects: subjects,
            newName: this.state.newName,
            newColor: this.state.newColor
        })
    }

    handleSubjectName(event) {
        this.setState({
            boardId: this.state.boardId,
            levelId: this.state.levelId,
            newName: event.target.value,
            newColor: this.state.newColor
        })
    }


    handleSubjectColor(event) {
        this.setState({
            boardId: this.state.boardId,
            levelId: this.state.levelId,
            newName: this.state.newName,
            newColor: event.target.value
        })
    }

    componentDidMount() {
        console.log(this.state);
        Meteor.call('loadSubjects', {board: this.state.boardId, level: this.state.levelId}, (err, res) => {
                if (err) {
                    console.log(err);
                    alert('Failed to load levels');
                } else {
                    console.log(res);
                    this.handleSubjects(res.map((subject) => {
                        return <li key={subject.name}><a href={"/explore/module/" + subject.name + "/" + subject._id}> {subject.name}</a></li>;
                    }));
                }
            }
        );
        Meteor.call('findUserRole', Meteor.userId(), (err, role) => {
            if (err)
                console.log(err);
            else {
                if (role[0].role === 'team')
                    this.setState({role: true});
            }
        });
    }

    handleSubmit() {
        Meteor.call('addSubject', {
            board: this.state.boardId,
            level: this.state.levelId,
            name: this.state.newName,
            color: this.state.color
        }, (err, res) => {
            if (err) {
                console.log(err);
                alert('Failed to add new subject');
            } else {
                console.log(res);
                alert('Successfully added new subject!');
            }
        })
    }


    renderBody() {
        console.log(this.state.subjects);
        return (
            <div className="containerRes">
                <ul>
                    {this.state.subjects}
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
            <span>Add Subject</span>
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
                    <label htmlFor="name"><b>New Module Name</b></label>
                    <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleSubjectName}/>
                    <button type="submit" className="registerbtn">Add</button>

                </form>
            </div>
        );
    }

    render() {
        if(Meteor.user()){
            if(this.state.role){
                return (
                    <div className="home-page -padding-20">
                        <Header/>
                        {this.renderBody()}
                        {this.renderAddBoardPopUp()}
                    </div>
                )
            }else{
                return (
                    <div className="home-page -padding-20">
                        <Header/>
                        {this.renderBody()}
                    </div>
                )
            }
        }else {
            return (
                <div className="home-page -padding-20">
                    <Header/>
                    {this.renderBody()}
                </div>
            )
        }

    }

}


export default Subject;
