import React from 'react';
import PropTypes from 'prop-types';

import {
  FlexBox,
  Title,
  Text,
} from '/client/components/atoms';

const Story = ({ progress }) => (
  <FlexBox
    align
    justify
    fullWidth
    className="page_story-container"
    style={{
      opacity: `calc(${progress})`,
    }}
  >
    <FlexBox align justifyBetween className="page_story-wrapper">
      <div
        style={{
          transform: `translate3d(calc(-10vw + 10vw * ${progress}), 0, 0)`,
        }}
      >
        <Title variant="h3">What is ZNotes?</Title>
        <Text>
        An organisation started and run by students from across the world,
        dedicating their time and sharing their resources for the common goal:
        Making it possible for anyone, anywhere, to make life better through
        access to education
        </Text>
      </div>
      <iframe
        width="660"
        height="415"
        src="https://www.youtube.com/embed/-aBAsQxGzH0"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        title="youtube"
        className="page_youtube-frame"
      />
    </FlexBox>
  </FlexBox>
);

Story.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Story;
