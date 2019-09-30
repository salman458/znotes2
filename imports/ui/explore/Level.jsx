import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import {Meteor} from "meteor/meteor";
import Popup from "reactjs-popup";


import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Level extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            boardId: props.boardId,
            levels: [],
            newName: '',
            role: false
        };

        this.handleLevels = this.handleLevels.bind(this);
        this.handleLevelName = this.handleLevelName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleLevels(levels) {
        this.setState({
            boardId: this.state.boardId,
            levels: levels,
            newName: this.state.newName
        })
    }

    handleLevelName(event) {
        this.setState({
            boardId: this.state.boardId,
            levels: this.state.levels,
            newName: event.target.value
        })
    }


    componentDidMount() {
        Meteor.call('loadLevelsByBoardId', this.state.boardId, (err, res) => {
                if (err) {
                    console.log(err);
                    alert('Failed to load levels');
                } else {
                    let index = 0;
                    let tmp = []
                    res.forEach(level => {
                        tmp.push(
                            <Slide index={index++}>
                                <div className="container1">
                                    <a className="subject" href={"/explore/subject/" + this.state.boardId + "/" + level._id}>{level.name}</a>
                                </div>
                            </Slide>
                        )
                    });
                    this.setState({levels:tmp});

                    if (Meteor.userId()) {
                        Meteor.call('findUserRole', Meteor.userId(), (err, role) => {
                            if (err)
                                console.log(err);
                            else {
                                if (role[0].role === 'team')
                                    this.setState({role: true});
                            }
                        });
                    }

                }
            }
        );


    }

    handleSubmit() {
        Meteor.call('addLevel', {board: this.state.boardId, name: this.state.newName}, (err, res) => {
            if (err) {
                console.log(err);
                alert('Failed to add new level');
            } else {
                console.log(res);
            }
        })
    }


    renderBody() {
        console.log(this.state.levels);
        if (Meteor.userId()) {
            if (this.state.role) {
                return (
                    <div className="containerRes1">
                        <h1 style={{color:"white"}}><b>Levels</b></h1>
                        {this.renderAddBoardPopUp()}
                        <CarouselProvider
                            naturalSlideWidth={50}
                            naturalSlideHeight={25}
                            totalSlides={this.state.levels.length}
                            visibleSlides={4}
                        >
                            <Slider>
                                {this.state.levels}
                            </Slider>
                            {/*<ButtonBack>Back</ButtonBack>*/}
                            {/*<ButtonNext>Next</ButtonNext>*/}
                        </CarouselProvider>
                    </div>
                )
            }
        } else {
            return (
                <div className="containerRes1">
                    <h1 style={{color:"white"}}><b>Levels</b></h1>
                    <CarouselProvider
                        naturalSlideWidth={50}
                        naturalSlideHeight={25}
                        totalSlides={this.state.levels.length}
                        visibleSlides={4}
                    >
                        <Slider>
                            {this.state.levels}
                        </Slider>
                        {/*<ButtonBack>Back</ButtonBack>*/}
                        {/*<ButtonNext>Next</ButtonNext>*/}
                    </CarouselProvider>
                </div>
            )
        }
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
            <span>Add Level</span>
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
                    <label htmlFor="name"><b>Level Name</b></label>
                    <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleLevelName}/>
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
            </div>
        )
    }

}


export default Level;
