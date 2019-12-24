import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Request } from '/client/utils';
import { Play, Perfection, Arrow } from '/client/components/icons';
import {
  FlexBox,
  Title,
  ProgressBar,
  PageContainer,
} from '/client/components/atoms';
import { SubjectCard } from '/client/components/molecules';
import { LandingActionCall } from '/client/components/organisms';
import Slider from 'react-slick';
import './styles.scss';

const Dashbboard = () => {
  const [lastLocation, setLast] = useState({});
  const [subjectData, setSubjectData] = useState([]);

  const slider = useRef(null);
  const onPrev = () => slider.current.slickPrev();
  const onNext = () => slider.current.slickNext();

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

      const [{ subjects }] = await Request({
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
          buttonAlignment="right"
        />
      </div>
      <Title variant="h3" gutterBottom>My Subjects</Title>
      <div className="page_dashbboard-subjects">
        <Arrow
          onClick={onPrev}
          className="page_dashboard-subject-arrow prev"
        />
        <Slider
          infinite
          ref={slider}
          arrows={false}
          slidesToShow={4}
          slidesToScroll={1}
          className="center"
        >
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
          <SubjectCard
            icon={<Perfection />}
            primaryColor="#75B543"
            secondaryColor="#8FCF5D"
            code="CIE IGCSE"
            subjectName="Biology 0421"
          />
        </Slider>
        <Arrow
          onClick={onNext}
          className="page_dashboard-subject-arrow next"
        />
      </div>
    </PageContainer>
  );
};

export default Dashbboard;
