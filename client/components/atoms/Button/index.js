import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MUIButton from '@material-ui/core/Button';
import useStyles from './styles';

const Button = ({ className, ...props }) => {
  const classes = useStyles();
  return (
    <MUIButton className={clsx(classes.root, className)} {...props} />
  );
};

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
