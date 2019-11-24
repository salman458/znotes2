import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOf(PropTypes.element, PropTypes.string).isRequired,
};

export default Link;
