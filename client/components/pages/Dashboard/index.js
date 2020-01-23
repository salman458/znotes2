import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import Paper from '@material-ui/core/Paper';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Request } from '/client/utils';
import { Play } from '/client/components/icons';
import {
  Link,
  Title,
  Button,
  FlexBox,
  ProgressBar,
  Highlighted,
  PageContainer,
} from '/client/components/atoms';
import {
  SubjectSlider,
  LandingActionCall,
} from '/client/components/organisms';
import { useUserData } from '/client/contexts/user';
import './styles.scss';

const Dashboard = () => {
  const [lastLocation, setLast] = useState(null);
  const [subjectData, setSubjectData] = useState([]);
  const userData = useUserData();

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
      const currentSubjectData = subjects.map(async ({ id: subjectId }) => {
        const result = await Request({
          action: 'getSubjectById',
          body: subjectId,
        });
        return result;
      });

      setSubjectData(currentSubjectData);
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
      {userData && (
        <Title variant="h1" className="page_dashboard-header">
          Welcome back,
          {' '}
          <Highlighted color="primary">
            {userData.username}
          </Highlighted>
        </Title>
      )}
      {lastLocation && (
        <div>
          <Title variant="h3">Return to</Title>
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
        </div>
      )}
      <div className="page_dashboard-autosuggest">
        <LandingActionCall
          minimal
          withHint
          align={false}
          titleText="Browse Courses"
        />
      </div>
      <FlexBox align fullWidth justifyBetween>
        <Title variant="h3" gutterBottom>My Subjects</Title>
        <Link to="/explore">
          <Button variant="outlined">
              Add Subject
          </Button>
        </Link>
      </FlexBox>

      {subjectData.length === 0
        ? (
          <FlexBox column align>
            <Title variant="h5" gutterBottom>No Subjects Yet?</Title>
            <Link to="/explore">
              <Button>
              Add Subject
              </Button>
            </Link>
          </FlexBox>
        )
        : (
          <SubjectSlider
            className="page_dashbboard-subjects"
            subjects={subjectData}
          />
        )}

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

export default Dashboard;
