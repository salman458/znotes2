import React from 'react';
import Autosuggest from 'react-autosuggest';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { lighten, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  CarouselProvider, Slider, Slide,
} from 'pure-react-carousel';
import { Stickyroll } from '@stickyroll/stickyroll';
import { Pagers } from '@stickyroll/pagers';
import { Inner } from '@stickyroll/inner';

import { Play } from '/client/components/icons';
import {
  Landing,
  Process,
  Story,
  Donate,
  Testimonials,
  Contact,
} from '/client/components/pages';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './styles.scss';

const content = [
  Landing,
  Story,
  Process,
  Testimonials,
  Donate,
  Contact,
];

const theme = {
  backgroundColor: '#121212',
  color: 'white',
  markerColor: '#D82057',
  markerWidth: '2px',
  markerSize: '2px',
  pagerBackgroundColor: '#D82057',
  pagerColor: '#D82057',
  pagerColorActive: '#D82057',
  pagerGap: '2vh',
  pagerSize: '1.5rem',
  strokeWidth: '2px',
};

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

class Home extends React.Component {
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
      lastModule: '',
    };
  }

  componentDidMount() {
    if (Meteor.userId()) {
      Meteor.call('getUser', Meteor.userId(), (err, res) => {
        if (err) console.log(err);
        else {
          const lastPositions = res[0].lastPositions.sort((x, y) => y.timestamp - x.timestamp);
          this.setState({ lastPosition: lastPositions[0].position });
          this.setState({ progress: lastPositions[0].progress });
          this.setState({ lastModule: lastPositions[0].moduleName });
          console.log('bbb', this.state);
        }
      });

      Meteor.call('getUserSubjects', Meteor.userId(), (err, res) => {
        if (err) console.log(err);
        else {
          const { subjects } = res[0];
          let index = 0;
          if (subjects.length === 0) {
            for (let i = 0; i < 5; i++) {
              this.state.userSubjects.push(
                <Slide index={i}>
                  <div className="container1">
                    <a className="subject" href="/explore">"Explore Notes"</a>
                  </div>
                </Slide>,
              );
            }
          }
          subjects.forEach((subject) => {
            Meteor.call('getSubjectById', subject.id, (err, res) => {
              if (err) console.log(err);
              else {
                index++;
                this.state.userSubjects.push(
                  <Slide index={index}>
                    <div className="container1">
                      <a className="subject" href={`/explore/module/${res[0].name}/${res[0]._id}`}>
                        {res[0].name}
                      </a>
                    </div>
                  </Slide>,
                );
                this.forceUpdate();
              }
            });
          });
        }
      });
    }
  }

    pageOnChange = (number) => {
      this.setState({ currentPage: number });
    };

    resumeHandler = () => {
      const { lastPosition } = this.state;
      FlowRouter.go(lastPosition);
      window.location.reload();
    }

    renderBody() {
      const {
        value, suggestions, lastModule, progress, userSubjects,
      } = this.state;

      const inputProps = {
        placeholder: 'What do you want to study today?',
        value,
        onChange: this.onChange,
      };
      return (
        <ul className="userPage">
          <li>
            <h1><b>Resume</b></h1>
            <h2>{lastModule}</h2>
            <div className="bdsm">
              <div className="play-button">
                <Play onClick={this.resumeHandler} />
              </div>
              <div className="progress-wrapper">
                <div className="progress-bar">
                  <BorderLinearProgress
                    variant="determinate"
                    color="secondary"
                    value={progress}
                  />
                </div>
              </div>

            </div>
          </li>
          <li>
            <h1><b>Browse Courses</b></h1>
            <div className="resumeContainer">
              <p className="exploreInvite">
                <b>Search for a course, or go to the</b>
                <a href="/explore">Explore</a>
                <b>
                  {' '}
page to see whole
                            content.
                </b>
              </p>
              <Autosuggest
                renderSuggestionsContainer={this.renderSuggestionsContainer}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                highlightFirstSuggestion
              />
              <button onClick={this.searchHandler} type="submit" className="resumeSearchBtn">Search</button>

            </div>

          </li>
          <li>
            <h1 className="subjectHeader"><b>My Subjects</b></h1>
            <CarouselProvider
              naturalSlideWidth={50}
              naturalSlideHeight={20}
              totalSlides={userSubjects.length}
              visibleSlides={4}
            >
              <Slider>
                {userSubjects}
              </Slider>
              {/* <ButtonBack>Back</ButtonBack> */}
              {/* <ButtonNext>Next</ButtonNext> */}
            </CarouselProvider>
          </li>
          <li>
            <h1><b>Community</b></h1>
            <div className="resumeContainer">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <h1 className="customh1">Our Podcasts</h1>
                  <Paper className="communityPaper">
                    <iframe
                      src="https://open.spotify.com/embed-podcast/show/7jPpEntVVviSy0SNOqnZMq"
                      width="100%"
                      height="232"
                      frameBorder="0"
                      allowTransparency="true"
                      allow="encrypted-media"
                      title="spotify"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={5}>
                  <h1 className="customh1">Community</h1>
                  <Paper className="discordPaper">
                    <iframe
                      src="https://discordapp.com/widget?id=513750483572097034&amp;theme=dark"
                      width="100%"
                      height="232"
                      allowTransparency="true"
                      frameBorder="0"
                      title="discord"
                    />
                  </Paper>
                </Grid>

              </Grid>
            </div>
          </li>
        </ul>
      );
    }

    render() {
      if (Meteor.user()) {
        return (
          <>
            <div className="home-page -padding-20">
              {this.renderBody()}
            </div>
          </>
        );
      }
      return (
        <>
          <Stickyroll pages={content} factor={1.3} anchors="" className="landing_container landing_root">
            {({
              pageIndex, progress,
            }) => {
              const Page = content[pageIndex];
              return (
                <Inner theme={theme} withPagers="right">
                  <Page progress={progress} />
                  <Pagers position="right" useContext />
                </Inner>
              );
            }}
          </Stickyroll>
        </>
      );
    }
}

export default Home;
