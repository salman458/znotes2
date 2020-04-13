import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import Paper from "@material-ui/core/Paper";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Request } from "/client/utils";
import { Play } from "/client/components/icons";
import {
  Link,
  Title,
  Button,
  FlexBox,
  ProgressBar,
  Highlighted,
  PageContainer,
} from "/client/components/atoms";
import { SubjectSlider, LandingActionCall } from "/client/components/organisms";
import { useUserData } from "/client/contexts/user";
import "./styles.scss";
import Subjects from "/client/components/molecules/SubjectCard/subjectData";
import _ from "lodash";
import { SanitizeName } from "/client/utils";
const Dashboard = () => {
  const [lastLocation, setLast] = useState({});
  const [subjectData, setSubjectData] = useState([]);
  const userData = useUserData();

  useEffect(() => {
    const getNecessaryData = async () => {
      const id = Meteor.userId();

      const [{ lastPositions }] = await Request({
        action: "getUser",
        body: id,
      });

      if (lastPositions.length) {
        // Apparently we like everything being an array
        // And reading data from the first element ALL THE FREAKING TIME
        const [lastItem] = lastPositions.sort(
          (x, y) => y.timestamp - x.timestamp
        );
        setLast(lastItem || {});
      }

      const subjects =
        (await Request({
          action: "getUserSubjects",
          body: id,
        })) || [];
      setSubjectData(subjects);
    };
    getNecessaryData();
  }, []);

  const handleResume = () => {
    FlowRouter.go(lastLocation.position);
    window.location.reload();
  };
  const {
    boardName = "",
    levelName = "",
    subjectName = "",
    moduleName = "",
  } = lastLocation;
  const { color } =
    Subjects[!_.isEmpty(subjectName) ? SanitizeName(subjectName) : ""] || {};
  const primaryColor = color || "#D82057";

  return (
    <PageContainer className="page_dashboard-container">
      {userData &&
        <Title variant="h1" className="page_dashboard-header">
          Welcome back,{" "}
          <Highlighted color="primary">{userData.username}</Highlighted>
        </Title>}
      {!_.isEmpty(lastLocation) &&
        <div>
          <Title variant="h3">
            <Highlighted style={{ color: primaryColor }}>Return</Highlighted> to
          </Title>
          <Title variant="h5">
          {boardName + " " + levelName + " " + subjectName}
          </Title>
          <Title variant="h5">
            {moduleName}
          </Title>
          <FlexBox justify align>
            <Play className="page_dashboard-icon" onClick={handleResume} />
            <div className="page_dashboard-progress-container">
              <ProgressBar
                variant="determinate"
                value={lastLocation.progress || 50}
              />
            </div>
          </FlexBox>
        </div>}
      <div className="page_dashboard-autosuggest">
        <LandingActionCall
          minimal
          withHint
          align={false}
          titleText="Browse Courses"
        />
      </div>
      <FlexBox align fullWidth justifyBetween>
        <Title variant="h3" gutterBottom>
          My Subjects
        </Title>
        <Link to="/explore">
          <Button variant="outlined">Add Subject</Button>
        </Link>
      </FlexBox>

      {subjectData.length === 0
        ? <FlexBox column align>
            <Title variant="h5" gutterBottom>
              No Subjects Yet?
            </Title>
            <Link to="/explore">
              <Button>Add Subject</Button>
            </Link>
          </FlexBox>
        : <SubjectSlider
            isUserSubjects
            className="page_dashbboard-subjects"
            subjects={subjectData}
          />}

      <div className="page_dashboard-community-container">
        <Title variant="h3" gutterBottom>
          Community
        </Title>
        <FlexBox align justifyBetween>
          <Paper className="page_dashboard-community-card page_dashboard-card-first">
            <Title variant="h5" gutterBottom>
              Our Podcast
            </Title>
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
            <Title variant="h5" gutterBottom>
              Join our discussions
            </Title>
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
