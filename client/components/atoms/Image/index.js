import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ src, ...props }) => (
  <img src={src} alt="" {...props} />
);

Link.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Link;
