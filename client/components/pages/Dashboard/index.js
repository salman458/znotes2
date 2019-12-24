import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Request } from '/client/utils';
import {
  FlexBox,
  Title,
  TextField,
  Button,
  PageContainer,
} from '/client/components/atoms';
import {
  LandingActionCall,
} from '/client/components/organisms';

const Dashbboard = () => {
  const [lastLocation, setLast] = useState(0);

  const saveSubjectData = ([{ subjects }]) => {
    subjects.map(({ id }) => (
      Request({
        action: 'getSubjectById',
        body: id,
        callback: (res) => res,
      })
    ));
  };

  useEffect(() => {
    const id = Meteor.userId();
    Request({
      action: 'getUser',
      body: id,
      callback: ([{ lastPositions }]) => {
        if (lastPositions.length) {
          // Apparently we like everything being an array
          // And reading data from the first element ALL THE FREAKING TIME
          const [lastItem] = lastPositions.sort((x, y) => y.timestamp - x.timestamp);
          setLast(lastItem);
        }
      },
    });
    Request({
      action: 'loadSubjects',
      body: '',
      callback: (res) => console.log(res),
    });
    Request({
      action: 'getUserSubjects',
      body: id,
      callback: saveSubjectData,
    });
  }, []);

  return (
    <PageContainer
      className="page_dashboard-container"
    >
      <LandingActionCall />
    </PageContainer>
  );
};

Dashbboard.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Dashbboard;
