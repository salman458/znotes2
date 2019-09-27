import React from 'react';
import Header from '../Header.jsx';
import AbstractComponent from "../AbstractComponent";
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/userPage.css";
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';


import {Pager} from "react-bootstrap";
import ReactPageScroller from "react-page-scroller";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";
import FifthComponent from "./FifthComponent";
import Autosuggest from 'react-autosuggest';
import {Line} from "rc-progress";
import {Button} from "react-bootstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowX: 'scroll',
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        top: "30%",
        height: "50%"

    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        height: "100%",
        color: theme.palette.primary.light,
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#0cb046', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#0ec74f',
    },
})(LinearProgress);


class Home extends AbstractComponent {

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.keywords.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            value: '',
            suggestions: [],
            keywords: [],
            progress: 1,
            lastPosition: '',
            userSubjects: [],
            drawUsers: [],
            lastModule: ''
        };
        this._pageScroller = null;

        this.resumeHandler = this.resumeHandler.bind(this);
    }

    componentDidMount() {
        Meteor.call('getKeywords', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                this.state.keywords = this.state.keywords.concat(res);
            }
        });

        Meteor.call('getSubjectKeywords', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                this.state.keywords = this.state.keywords.concat(res);
            }
        });

        Meteor.call('getLevelKeywords', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                this.state.keywords = this.state.keywords.concat(res);
            }
        });


        Meteor.call('getBoardKeywords', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                this.state.keywords = this.state.keywords.concat(res);
            }
        });

        if (Meteor.userId()) {
            Meteor.call('getUser', Meteor.userId(), (err, res) => {
                if (err)
                    console.log(err);
                else {
                    let lastPositions = res[0].lastPositions.sort((x,y)=>{return y.timestamp - x.timestamp});
                    this.setState({lastPosition: lastPositions[0].position});
                    this.setState({progress: lastPositions[0].progress});
                    this.setState({lastModule: lastPositions[0].moduleName});
                    console.log('bbb', this.state);
                }
            });

            Meteor.call('getUserSubjects', Meteor.userId(), (err, res) => {
                if (err)
                    console.log(err);
                else {
                    let subjects = res[0].subjects;
                    let index = 0;
                    subjects.forEach(subject => {
                        Meteor.call('getSubjectById', subject.id, (err, res) => {
                            if (err)
                                console.log(err);
                            else {
                                index++;
                                this.state.userSubjects.push(
                                    <Slide index={index}>
                                        <div className="container1">
                                            <a className="subject" href={'/explore/module/' + res[0].name + '/' + res[0]._id}>{res[0].name}
                                            </a>
                                        </div>
                                    </Slide>
                                );
                                this.forceUpdate();
                            }
                        });
                    });


                }
            })
        }


    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };


    goToPage = (eventKey) => {
        this._pageScroller.goToPage(eventKey);
    };

    pageOnChange = (number) => {
        this.setState({currentPage: number});
    };

    getPagesNumbers = () => {

        const pageNumbers = [];

        for (let i = 1; i <= 5; i++) {
            if (i == this.state.currentPage) {
                pageNumbers.push(
                    <li>
                        <svg width="31px" height="31px" viewBox="0 0 31 31" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="homepage-dark" transform="translate(-1820.000000, -514.000000)" fill="#FFFFFF">
                                    <g id="Group-10" transform="translate(1820.000000, 514.000000)">
                                        <circle id="Oval" cx="15.5" cy="15.5" r="15.5"></circle>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </li>
                )
            } else {
                pageNumbers.push(
                    <li>
                        <svg width="31px" height="31px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="homepage-dark" transform="translate(-1824.000000, -683.000000)" fill="#383838">
                                    <g id="Group-10" transform="translate(1820.000000, 514.000000)">
                                        <circle id="Oval" cx="16" cy="181" r="12"></circle>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </li>
                )
            }
        }

        return [...pageNumbers];
    };

    searchHandler = () => {
        Meteor.call('genericSearch', this.state.value, (err, res) => {
            if (err)
                console.log(err);
            else {
                let type = res.type;
                let id = res.id[0];

                switch (type) {
                    case 'board':
                        FlowRouter.go('/explore/level/' + id._id);
                        break;
                    case 'level':
                        Meteor.call('getBoardIdByLevel', id._id, (err, res) => {
                            if (err)
                                console.log(err);
                            else {
                                FlowRouter.go('/explore/subject/' + res + '/' + id._id);
                            }
                        });
                        break;
                    case 'subject':
                        Meteor.call('loadSubjectName', id._id, (err, res) => {
                            if (err)
                                console.log(err);
                            else {
                                FlowRouter.go('/explore/module/' + res + '/' + id._id);
                            }
                        });
                        break;
                    case 'module':
                        Meteor.call('getSubjectNameByModuleId', id._id, (err, res) => {
                            if (err)
                                console.log(err);
                            else {
                                FlowRouter.go('/explore/chapters/module/' + id._id + '/' + res + '/' + 1);
                            }
                        })

                }
            }

        });
    };

    resumeHandler() {
        FlowRouter.go(this.state.lastPosition);
        window.location.reload();
    }

    renderBody() {
        if (Meteor.user()) {
            const {value, suggestions} = this.state;

            const inputProps = {
                placeholder: 'What do you want to study today?',
                value,
                onChange: this.onChange
            };
            return (
                <ul className="userPage">
                    <li>
                        <h1><b>Resume</b></h1>
                        <h2>{this.state.lastModule}</h2>
                        <div className="bdsm">
                            <div className="play-button">
                                <svg onClick={this.resumeHandler} className="playIcon" width="188px" height="188px" viewBox="0 0 188 188"
                                     version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                        <circle id="path-1" cx="41" cy="41" r="41"></circle>
                                        <filter x="-102.4%" y="-102.4%" width="304.9%" height="304.9%" filterUnits="objectBoundingBox" id="filter-2">
                                            <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                            <feGaussianBlur stdDeviation="28" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                            <feColorMatrix values="0 0 0 0 0.529411765   0 0 0 0 0.945098039   0 0 0 0 0.764705882  0 0 0 1 0"
                                                           type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                                        </filter>
                                    </defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="dark-dashboard" transform="translate(-88.000000, -373.000000)">
                                            <g id="resume" transform="translate(141.000000, 259.000000)">
                                                <g id="Group-8" transform="translate(0.000000, 167.000000)">
                                                    <g id="Oval">
                                                        <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                                                        <use fill="#87F1C3" fill-rule="evenodd" xlinkHref="#path-1"></use>
                                                    </g>
                                                    <polygon id="Triangle" fill="#FFFFFF"
                                                             transform="translate(43.500000, 42.000000) rotate(90.000000) translate(-43.500000, -42.000000) "
                                                             points="43.5 28 61 56 26 56"></polygon>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="progress-wrapper">
                                <div className="progress-bar"><BorderLinearProgress
                                    variant="determinate"
                                    color="secondary"
                                    value={this.state.progress}
                                /></div>
                            </div>

                        </div>
                    </li>

                    <li>
                        <h1><b>Browse Courses</b></h1>
                        <div className="resumeContainer">
                            <p className="exploreInvite"><b>Search for a course, or go to the</b> <a href="/explore">Explore</a><b> page to see whole
                                content.</b></p>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}
                            />
                            <button onClick={this.searchHandler} type="submit" className="resumeSearchBtn">Search</button>

                        </div>

                    </li>


                    <li>
                        <h1 className="subjectHeader"><b>My Subjects</b></h1>


                        <CarouselProvider
                            naturalSlideWidth={50}
                            naturalSlideHeight={20}
                            totalSlides={this.state.userSubjects.length}
                            visibleSlides={4}
                        >
                            <Slider>
                                {this.state.userSubjects}
                            </Slider>
                            {/*<ButtonBack>Back</ButtonBack>*/}
                            {/*<ButtonNext>Next</ButtonNext>*/}
                        </CarouselProvider>
                    </li>

                    <li>
                        <h1><b>Community</b></h1>
                        <div className="resumeContainer">
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <h1 className='customh1'>Our Podcasts</h1>
                                    <Paper className="communityPaper">
                                        <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380"
                                                frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                                    </Paper>
                                </Grid>
                                <Grid item xs={5}>
                                    <h1 className='customh1'>Community</h1>
                                    <Paper className="discordPaper">
                                        <iframe className="discord" src="https://discordapp.com/widget?id=201798443583143936&theme=dark"/>
                                    </Paper>
                                </Grid>
                            </Grid>

                            {/*{this.state.drawUsers}*/}
                        </div>
                    </li>

                </ul>


            )
        } else {
            const {value, suggestions} = this.state;

            const inputProps = {
                placeholder: 'What do you want to study today?',
                value,
                onChange: this.onChange
            };
            return (
                <div className="search__container -layout-v -center">
                    <ul>
                        <li><img className="logo-search" src="/img/logo.png"/></li>
                        <li><h1>For Students, By Students</h1></li>
                        <li><Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                        /></li>
                        {/*<li><input className="search__input -full-width" type="text" placeholder="What do you want to study today? E.G. AS Physics"/></li>*/}
                        <li>
                            <button onClick={this.searchHandler} type="submit" className="searchBtn">Search</button>
                        </li>
                    </ul>
                </div>


            )
        }
    }

    // render() {
    //
    //     return (
    //         <div className="home-page -padding-20">
    //             <Header/>
    //             {this.renderBody()}
    //         </div>
    //     )
    // }
    render() {
        const pagesNumbers = this.getPagesNumbers();
        if (Meteor.user()) {
            return <React.Fragment>
                <div className="home-page -padding-20">
                    <Header/>
                    {this.renderBody()}
                </div>
            </React.Fragment>
        } else {
            return <React.Fragment>
                <ReactPageScroller ref={c => this._pageScroller = c} pageOnChange={this.pageOnChange}>
                    <div className="home-page -padding-20">
                        <Header/>
                        {this.renderBody()}
                    </div>
                    <SecondComponent/>
                    <ThirdComponent/>
                    <FourthComponent/>
                    <FifthComponent/>
                </ReactPageScroller>
                <Pager className="pagination-additional-class" bsSize="large">
                    {pagesNumbers}
                </Pager>
            </React.Fragment>
        }

    }


}


export default Home;
