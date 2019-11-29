import React from 'react';
import PropTypes from 'prop-types';
import MUIButton from '@material-ui/core/Button';

const Button = ({ className, ...props }) => (
  <MUIButton className={`atom_button ${className}`} {...props} />
);

Button.defaultProps = {
  className: '',
  variant: 'contained',
  color: 'primary',
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
