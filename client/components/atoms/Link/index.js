import React from 'react';
import PropTypes from 'prop-types';

const Link = ({
  to,
  children,
  className,
  newPage,
  ...props
}) => (
  <a
    href={to}
    className={`atom_link ${className}`}
    {...newPage ? { target: '_blank' } : {}}
    {...props}
  >
    {children}
  </a>
);

Link.defaultProps = {
  className: '',
  newPage: false,
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  newPage: PropTypes.bool,
};

export default Link;
