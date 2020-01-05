import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import Paper from '@material-ui/core/Paper';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Request } from '/client/utils';
import { Play } from '/client/components/icons';
import {
  FlexBox,
  Title,
  ProgressBar,
  PageContainer,
} from '/client/components/atoms';
import {
  SubjectSlider,
  LandingActionCall,
} from '/client/components/organisms';
import './styles.scss';

const Dashbboard = () => {
  const [lastLocation, setLast] = useState({});
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    const getNecessaryData = async () => {
      const id = Meteor.userId();

      const [{ lastPositions }] = await Request({
        action: 'getUser',
        body: id,
      });

      if (lastPositions.length) {
      // Apparently we like everything being an array
      // And reading data from the first element ALL THE FREAKING TIME
        const [lastItem] = lastPositions.sort((x, y) => y.timestamp - x.timestamp);
        setLast(lastItem || {});
      }

      const [{ subjects = [] }] = await Request({
        action: 'getUserSubjects',
        body: id,
      });
      if (subjects.length === 0) {
        const allSubjects = await Request({
          action: 'getAllSubjects',
        });
        setSubjectData(allSubjects || []);
      } else {
        const currentSubjectData = subjects.map(async ({ id: subjectId }) => {
          const result = await Request({
            action: 'getSubjectById',
            body: subjectId,
          });
          return result;
        });

        setSubjectData(currentSubjectData);
      }
    };
    getNecessaryData();
  }, []);

  const handleResume = () => {
    FlowRouter.go(lastLocation.position);
    window.location.reload();
  };

  return (
    <PageContainer
      className="page_dashboard-container"
    >
      <Title variant="h3">Resume</Title>
      <Title variant="h5">{lastLocation.moduleName}</Title>
      <FlexBox justify align>
        <Play className="page_dashboard-icon" onClick={handleResume} />
        <div className="page_dashboard-progress-container">
          <ProgressBar
            variant="determinate"
            value={lastLocation.progress || 50}
          />
        </div>
      </FlexBox>
      <div className="page_dashboard-autosuggest">
        <LandingActionCall
          minimal
          withHint
          align={false}
          titleText="Browse Courses"
        />
      </div>
      <Title variant="h3" gutterBottom>My Subjects</Title>
      <SubjectSlider
        className="page_dashbboard-subjects"
        subjects={subjectData}
      />
      <div className="page_dashboard-community-container">
        <Title variant="h3" gutterBottom>Community</Title>
        <FlexBox align justifyBetween>
          <Paper className="page_dashboard-community-card page_dashboard-card-first">
            <Title variant="h5" gutterBottom>Our Podcast</Title>
            <iframe
              src="https://open.spotify.com/embed-podcast/show/7jPpEntVVviSy0SNOqnZMq"
              width="100%"
              height="232"
              frameBorder="0"
              allow="encrypted-media"
              title="spotify"
            />
          </Paper>
          <Paper className="page_dashboard-community-card">
            <Title variant="h5" gutterBottom>Join our discussions</Title>
            <iframe
              src="https://discordapp.com/widget?id=513750483572097034&amp;theme=dark"
              width="100%"
              height="232"
              frameBorder="0"
              title="discord"
            />
          </Paper>
        </FlexBox>
      </div>
    </PageContainer>
  );
};

export default Dashbboard;
