import React from 'react';
import PropTypes from 'prop-types';

import {
  FlexBox,
  Title,
  Text,
  Image,
} from '/client/components/atoms';

const Donate = ({ progress }) => (
  <FlexBox
    align
    justify
    column
    fullWidth
    className="page_donate-container"
    style={{
      opacity: `calc(${progress})`,
    }}
  >
    <Title
      variant="h3"
      gutterBottom
      style={{
        transform: `translate3d(0, calc(-10vh + 10vh * ${progress}), 0)`,
      }}
    >
      Donate
    </Title>
    <FlexBox align justifyBetween className="page_donate-wrapper">
      <FlexBox column align>
        <Image src="/img/goals.png" className="page_donate-image" />
        <Title
          variant="h5"
          gutterBottom
        >
          ZNotes is supporting goal number 4:
        </Title>
        <Text>
          Ensure inclusive and quality education for all and promote lifelong learning
        </Text>
      </FlexBox>
      <FlexBox column justify align>
        <Title
          variant="h5"
          gutterBottom
        >
          Patron
        </Title>
        <Text>
          Need Patron URL
        </Text>
      </FlexBox>
    </FlexBox>
  </FlexBox>
);

Donate.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Donate;
