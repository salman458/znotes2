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
import SixthComponent from "./SixthComponent";
import Autosuggest from 'react-autosuggest';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import theme from './theme.css';

import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


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
        //
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.keywords.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => (
        <span>
            {suggestion.name}
        </span>
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
                    let lastPositions = res[0].lastPositions.sort((x, y) => {
                        return y.timestamp - x.timestamp
                    });
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
                    if (subjects.length === 0) {
                        for (let i = 0; i < 5; i++) {
                            this.state.userSubjects.push(
                                <Slide index={i}>
                                    <div className="container1">
                                        <a className="subject" href="/explore">"Explore Notes"</a>
                                    </div>
                                </Slide>
                            );
                        }
                    }
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

        for (let i = 1; i <= 6; i++) {
            if (i == this.state.currentPage) {
                pageNumbers.push(<Pager.Item key={i} eventKey={i - 1} onSelect={this.goToPage}>
                    <svg className="dot" width="31px" height="31px" viewBox="0 0 31 31" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="homepage-dark" transform="translate(-1820.000000, -514.000000)" fill="#FFFFFF">
                                <g id="Group-10" transform="translate(1820.000000, 514.000000)">
                                    <circle id="Oval" cx="15.5" cy="15.5" r="15.5"></circle>
                                </g>
                            </g>
                        </g>
                    </svg>
                </Pager.Item>);

            } else {
                pageNumbers.push(<Pager.Item key={i} eventKey={i - 1} onSelect={this.goToPage}>
                    <svg className="dot" width="31px" height="31px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="homepage-dark" transform="translate(-1824.000000, -683.000000)" fill="#383838">
                                <g id="Group-10" transform="translate(1820.000000, 514.000000)">
                                    <circle id="Oval" cx="16" cy="181" r="12"></circle>
                                </g>
                            </g>
                        </g>
                    </svg>
                </Pager.Item>);
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
                            highlightFirstSuggestion={true}
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
                                    <iframe src="https://open.spotify.com/embed-podcast/show/7jPpEntVVviSy0SNOqnZMq" width="100%" height="232"
                                            frameBorder="0"
                                            allowTransparency="true" allow="encrypted-media"></iframe>
                                </Paper>
                            </Grid>
                            <Grid item xs={5}>
                                <h1 className='customh1'>Community</h1>
                                <Paper className="discordPaper">
                                    <iframe src="https://discordapp.com/widget?id=513750483572097034&amp;theme=dark" width="100%" height="232"
                                            allowTransparency="true" frameBorder="0"></iframe>
                                </Paper>
                            </Grid>

                        </Grid>
                    </div>
                </li>
            </ul>
        )
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
                    {this.renderFooter()}
                </div>
            </React.Fragment>
        } else {
            return <React.Fragment>
                <ReactPageScroller ref={c => this._pageScroller = c} pageOnChange={this.pageOnChange}>
                    <div className="home-page1 -padding-20">
                        <Header/>
                        {this.renderDefaultBody()}
                    </div>
                    <SecondComponent/>
                    <ThirdComponent/>
                    <FourthComponent/>
                    <FifthComponent/>
                    <SixthComponent/>
                </ReactPageScroller>
                <Pager className="pagination-additional-class" bsSize="large">
                    {pagesNumbers}
                </Pager>
            </React.Fragment>
        }

    }

    renderFooter() {
        return (
            <div>

                <ul className="social">
                    <li className="team"><p>Made with love by ZNotes team</p></li>
                    <li>
                        <a href="https://www.facebook.com/" target="_blank">
                            <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-759.000000, -2361.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="facebook" transform="translate(0.000000, 0.952381)">
                                                        <path
                                                            d="M33.7857402,0 L5.26178332,0 C2.35583847,0 0,2.35572566 0,5.26174471 L0,33.7856833 C0,36.6917023 2.35574295,39.047428 5.26178332,39.047428 L19.3296628,39.047428 L19.3536386,25.0939898 L15.7285149,25.0939898 C15.2574045,25.0939898 14.8750333,24.7130542 14.8732184,24.2419473 L14.8558335,19.7441752 C14.8540186,19.2704893 15.2375361,18.8855418 15.7112255,18.8855418 L19.3297583,18.8855418 L19.3297583,14.5395518 C19.3297583,9.49607131 22.4100293,6.749858 26.9091716,6.749858 L30.6010646,6.749858 C31.0734168,6.749858 31.4564566,7.13279954 31.4564566,7.60524375 L31.4564566,11.3977882 C31.4564566,11.8700414 31.0737033,12.2528874 30.6015422,12.253174 L28.3358757,12.2542247 C25.8891011,12.2542247 25.4153161,13.4168998 25.4153161,15.1231818 L25.4153161,18.8856373 L30.7917248,18.8856373 C31.3040048,18.8856373 31.7014684,19.3329596 31.641099,19.8417016 L31.1079954,24.3394737 C31.0569871,24.7698889 30.6920007,25.0941808 30.2586212,25.0941808 L25.4392919,25.0941808 L25.4153161,39.047619 L33.7859312,39.047619 C36.6918761,39.047619 39.047619,36.6918934 39.047619,33.7859699 L39.047619,5.26174471 C39.0475235,2.35572566 36.6917806,0 33.7857402,0 Z"
                                                            id="Path"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/" target="_blank">
                            <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-839.000000, -2361.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="instagram" transform="translate(80.000000, 0.000000)">
                                                        <g id="Group-15">
                                                            <path
                                                                d="M28.0837843,0 L11.9162157,0 C5.34558666,0 0,5.34558666 0,11.9162157 L0,28.0837843 C0,34.6544133 5.34558666,40 11.9162157,40 L28.0837843,40 C34.6544133,40 40,34.6544133 40,28.0837843 L40,11.9162157 C39.9999274,5.34558666 34.6543407,0 28.0837843,0 Z M35.9760015,28.0837843 C35.9760015,32.442499 32.442499,35.9760015 28.0837843,35.9760015 L11.9162157,35.9760015 C7.55750099,35.9760015 4.02399852,32.442499 4.02399852,28.0837843 L4.02399852,11.9162157 C4.02399852,7.5574284 7.55750099,4.02399852 11.9162157,4.02399852 L28.0837843,4.02399852 C32.442499,4.02399852 35.9760015,7.5574284 35.9760015,11.9162157 L35.9760015,28.0837843 Z"
                                                                id="Shape"></path>
                                                            <path
                                                                d="M20,9.56521739 C14.2462516,9.56521739 9.56521739,14.2462681 9.56521739,19.9999634 C9.56521739,25.7536587 14.2462516,30.4347826 20,30.4347826 C25.7537484,30.4347826 30.4347826,25.7537319 30.4347826,19.9999634 C30.4347826,14.2461948 25.7537484,9.56521739 20,9.56521739 Z M20,26.3760855 C16.4785894,26.3760855 13.6239735,23.5214595 13.6239735,20.0000366 C13.6239735,16.4786137 16.4786627,13.6239877 20,13.6239877 C23.5214106,13.6239877 26.3760265,16.4786137 26.3760265,20.0000366 C26.3760265,23.5213863 23.5213373,26.3760855 20,26.3760855 Z"
                                                                id="Shape"></path>
                                                            <circle id="Oval" cx="30.4347826" cy="9.56521739" r="2.60869565"></circle>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/" target="_blank">
                            <svg width="59px" height="40px" viewBox="0 0 59 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-919.000000, -2361.000000)" fill="#DA1D56" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="youtube" transform="translate(160.952381, 0.000000)">
                                                        <path
                                                            d="M45.275018,0 L11.8678391,0 C5.31340651,0 0,5.2561493 0,11.7399514 L0,28.2600486 C0,34.7438507 5.31340651,40 11.8678391,40 L45.275018,40 C51.8294506,40 57.1428571,34.7438507 57.1428571,28.2600486 L57.1428571,11.7399514 C57.1428571,5.2561493 51.8294506,0 45.275018,0 Z M37.2488811,20.8037619 L21.6232565,28.1759325 C21.2068954,28.3723668 20.7259544,28.0720749 20.7259544,27.6158128 L20.7259544,12.4106727 C20.7259544,11.9479118 21.2195387,11.6479878 21.6367674,11.8571744 L37.2623921,19.690144 C37.7269712,19.9229958 37.7189142,20.5820683 37.2488811,20.8037619 Z"
                                                            id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com/" target="_blank">
                            <svg width="47px" height="40px" viewBox="0 0 47 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-1018.000000, -2362.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="twitter" transform="translate(259.000000, 1.000000)">
                                                        <path
                                                            d="M42.7068181,5.63396897 C43.9237893,4.47068817 44.8387932,3.01567156 45.3550047,1.39161071 C45.5023474,0.927969374 45.0017235,0.527047233 44.585523,0.77529163 C43.0490628,1.6920448 41.3940458,2.37978135 39.6663245,2.81961686 C39.566086,2.84513945 39.4626616,2.85807242 39.3588959,2.85807242 C39.0441856,2.85807242 38.7382361,2.74053116 38.4975953,2.52719434 C36.6593954,0.897525386 34.2951992,0 31.840663,0 C30.7785439,0 29.7061848,0.166526325 28.6532818,0.49500093 C25.3910345,1.5128144 22.8739204,4.21969695 22.0841862,7.55937952 C21.7879079,8.81204662 21.7076943,10.0658582 21.8455935,11.2859068 C21.8614086,11.4261093 21.7955311,11.523965 21.7549123,11.5698599 C21.6835734,11.650319 21.5824246,11.6964428 21.4774073,11.6964428 C21.4656882,11.6964428 21.4536277,11.6958705 21.441681,11.694726 C14.3007365,11.0273618 7.861348,7.56670439 3.30965292,1.95036089 C3.07754548,1.66388983 2.63244534,1.69902631 2.44744206,2.01823038 C1.556104,3.55645293 1.08506243,5.31579496 1.08506243,7.10603879 C1.08506243,9.84966013 2.18085984,12.4352245 4.0842546,14.3201194 C3.28382528,14.129215 2.50910982,13.828552 1.78946299,13.4264853 C1.44130184,13.2319185 1.01292708,13.4819941 1.00803462,13.8825729 C0.958199792,17.9584048 3.33047432,21.5851307 6.88422121,23.2182332 C6.81265475,23.21995 6.74108829,23.2207512 6.66940805,23.2207512 C6.10609241,23.2207512 5.53572252,23.1660435 4.9743411,23.0581162 C4.58226158,22.9828074 4.25287382,23.3569479 4.37461645,23.739329 C5.52809938,27.3618202 8.62878166,30.031964 12.3393148,30.6382113 C9.2597953,32.717673 5.67362164,33.8145722 1.94112927,33.8145722 L0.777520082,33.8138855 C0.419005116,33.8138855 0.115786333,34.048968 0.0244224751,34.3982727 C-0.0655760454,34.7423127 0.100198726,35.1052371 0.405920628,35.2841241 C4.6118439,37.7463102 9.4092998,39.047619 14.2817355,39.047619 C18.5467096,39.047619 22.5362269,38.1962174 26.139581,36.5172201 C29.4429022,34.9779675 32.3619945,32.7776454 34.8157342,29.9773708 C37.1015373,27.3688017 38.8889922,24.3574793 40.1282638,21.0271817 C41.3096224,17.852652 41.9340369,14.4653578 41.9340369,11.231428 L41.9340369,11.0773769 C41.9339231,10.5581123 42.1673959,10.0695207 42.5747217,9.73692581 C44.1203979,8.47453038 45.4663935,6.98849753 46.5751616,5.3201441 C46.8679128,4.87962189 46.4062011,4.32750987 45.9244644,4.542449 C44.887604,5.00494582 43.8112627,5.36981587 42.7068181,5.63396897 Z"
                                                            id="Path"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://discordapp.com" target="_blank">
                            <svg width="56px" height="41px" viewBox="0 0 56 41" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-1106.000000, -2361.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="Discord" transform="translate(347.000000, 0.000000)">
                                                    <path
                                                        d="M48.3636364,5.125 C48.3636364,5.125 42.5269091,0.5253125 35.6363636,0 L35.0152727,1.25178125 C41.244,2.788 44.1025455,4.9840625 47.0909091,7.6875 C41.9401818,5.0404375 36.8581818,2.5625 28,2.5625 C19.1418182,2.5625 14.0598182,5.0404375 8.90909091,7.6875 C11.8974545,4.9840625 15.2981818,2.542 20.9847273,1.25178125 L20.3636364,0 C13.1345455,0.68546875 7.63636364,5.125 7.63636364,5.125 C7.63636364,5.125 1.11872727,14.6395625 0,33.3125 C6.56727273,40.9397813 16.5454545,41 16.5454545,41 L18.6327273,38.20175 C15.0894545,36.9615 11.0930909,34.7487813 7.63636364,30.75 C11.7574545,33.8890625 17.9772727,37.15625 28,37.15625 C38.0227273,37.15625 44.2425455,33.8890625 48.3636364,30.75 C44.9081818,34.7487813 40.9118182,36.9615 37.3672727,38.20175 L39.4545455,41 C39.4545455,41 49.4327273,40.9397813 56,33.3125 C54.8812727,14.6395625 48.3636364,5.125 48.3636364,5.125 Z M19.7272727,28.1875 C17.2658182,28.1875 15.2727273,25.8940625 15.2727273,23.0625 C15.2727273,20.2309375 17.2658182,17.9375 19.7272727,17.9375 C22.1887273,17.9375 24.1818182,20.2309375 24.1818182,23.0625 C24.1818182,25.8940625 22.1887273,28.1875 19.7272727,28.1875 Z M36.2727273,28.1875 C33.8112727,28.1875 31.8181818,25.8940625 31.8181818,23.0625 C31.8181818,20.2309375 33.8112727,17.9375 36.2727273,17.9375 C38.7341818,17.9375 40.7272727,20.2309375 40.7272727,23.0625 C40.7272727,25.8940625 38.7341818,28.1875 36.2727273,28.1875 Z"
                                                        id="surface1"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li className="term"><p><a>Terms of Use </a> Copyright @ 2019 ZNotes</p></li>
                </ul>
            </div>
        )


    }

    renderDefaultBody() {
        const {value, suggestions} = this.state;

        const inputProps = {
            placeholder: 'What do you want to study today?',
            value,
            onChange: this.onChange
        };
        return (
            <div className="search__container -layout-v -center">
                <ul className="searchUl">
                    <li><img style={{height: 200}} className="logo-search" src="/img/logo.png"/></li>
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


export default Home;
