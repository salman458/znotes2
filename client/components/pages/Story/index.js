import React from 'react';
import PropTypes from 'prop-types';
import { HelperScroll } from '/client/components/molecules';

import {
  Highlighted,
  FlexBox,
  Image,
  Title,
} from '/client/components/atoms';

const Story = ({ progress ,onDownPress}) => (
  <FlexBox
    align
    justify
    fullWidth
    className="page_story-container"
    style={{
      opacity: `calc(${progress ==0 ?1: progress + 0.5})`,
    }}
  >
    <FlexBox align justifyBetween className="page_story-wrapper">
      <div
        style={{
          transform: `translate3d(calc(-10vw + 7vw * ${progress ==0 ?progress+0.6: progress}), 0, 0)`,
        }}
      >
        <Title variant="h3">
          We’re on a mission to making
          {' '}
          <Highlighted
            color="primary"
          >
            high-quality
          </Highlighted>
          {' '}
          education accessible to
          {' '}
          <Highlighted
            color="primary"
          >
            all!
          </Highlighted>
        </Title>
        <FlexBox align>
          <Image className="page_story-edu-image" src="/img/quality_education.png" />
          <Image className="page_story-goals-image" src="/img/goals.png" />
        </FlexBox>
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
    <HelperScroll onDownPress={onDownPress}/>
  </FlexBox>
);

Story.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Story;
