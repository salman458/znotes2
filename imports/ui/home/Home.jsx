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
import Autosuggest from 'react-autosuggest';
import {Line} from "rc-progress";
import {Button} from "react-bootstrap";
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#b2dfdb',
    },
    barColorPrimary: {
        backgroundColor: '#00695c',
    },
})(LinearProgress);

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
                    let lastPositions = res[0].lastPositions;
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
                    subjects.forEach(subject => {
                        Meteor.call('getSubjectById', subject.id, (err, res) => {
                            if (err)
                                console.log(err);
                            else {
                                this.state.userSubjects.push(res[0]);
                                this.state.drawUsers.push(<a href={'/explore/module/' + res[0].name + '/' + res[0]._id}> {res[0].name}</a>)
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

        for (let i = 1; i <= 6; i++) {
            pageNumbers.push(
                <Pager.Item key={i} eventKey={i - 1} onSelect={this.goToPage}>{i}</Pager.Item>
            )
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
                                <svg width="188px" height="188px" viewBox="0 0 188 188" version="1.1" xmlns="http://www.w3.org/2000/svg"
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

                        <div className="resumeContainer">
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}
                            />
                            <button onClick={this.searchHandler} type="submit" className="searchBtn">Search</button>

                        </div>

                    </li>


                    <li>
                        <div className="resumeContainer">
                            {this.state.drawUsers}

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

        return <React.Fragment>
            <ReactPageScroller ref={c => this._pageScroller = c} pageOnChange={this.pageOnChange}>
                <div className="home-page -padding-20">
                    <Header/>
                    {this.renderBody()}
                </div>
                <SecondComponent/>
            </ReactPageScroller>
            <Pager className="pagination-additional-class" bsSize="large">
                {pagesNumbers}
            </Pager>
        </React.Fragment>
    }


}


export default Home;
