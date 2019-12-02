import React from 'react';
import PropTypes from 'prop-types';
import {
  FlexBox,
  Text,
} from '/client/components/atoms';

const Quote = ({ children, author, title }) => (
  <FlexBox column justify align className="page_testimonial-quote">
    <Text color="textSecondary" className="page_testimonial-element page_testimonial-text">{children}</Text>
    <Text color="textSecondary" className="page_testimonial-element page_testimonial-author">{author}</Text>
    <Text color="textSecondary" className="page_testimonial-element page_testimonial-title">{title}</Text>
  </FlexBox>
);

Quote.defaultProps = {
  title: '',
};

Quote.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

export default Quote;
