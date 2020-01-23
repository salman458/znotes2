import React from 'react';
import PropTypes from 'prop-types';

import {
  FlexBox,
  Title,
  TextField,
  Button,
} from '/client/components/atoms';

const Contact = ({ progress }) => (
  <FlexBox
    align
    justify
    column
    fullWidth
    className="page_contact-container"
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
      Contact Us!
    </Title>
    <FlexBox column justify align className="page_contact-wrapper">
      <TextField
        className="page_contact-input"
        label="Email"
      />
      <TextField
        className="page_contact-input"
        label="Name"
      />
      <TextField
        multiline
        rows={3}
        label="Message"
        className="page_contact-input"
      />
      <Button
        className="page_contact-submit-button"
        color="secondary"
      >
        Submit
      </Button>
    </FlexBox>
  </FlexBox>
);

Contact.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Contact;
