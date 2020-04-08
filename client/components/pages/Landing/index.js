import React from 'react';
import PropTypes from 'prop-types';

import {
  FlexBox,
  Particles,
} from '/client/components/atoms';
import { HelperScroll } from '/client/components/molecules';
import {
  LandingActionCall, Snackbar
} from '/client/components/organisms';

import './styles.scss';

// TODO: Write a HOC that will handle progress
const Landing = ({ progress,onDownPress }) => (
  <FlexBox
    align
    justify
    fullWidth
    className="page_landing-root"
    style={{
      opacity: `calc(1 - 1 * ${progress})`,
      transform: `translateY(calc(-30vh * ${progress})`,
    }}
  >
    <Particles className="page_landing-particles" />
    <LandingActionCall
     titleText="FOR STUDENTS. BY STUDENTS."
     />
    <HelperScroll onDownPress={onDownPress}/>
  </FlexBox>

);

Landing.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Landing;
