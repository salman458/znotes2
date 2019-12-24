import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Title = ({ className, ...props }) => (
  <Typography
    variant="h1"
    component="h2"
    color="textPrimary"
    className={`atom_title ${className}`}
    {...props}
  />
);

Title.defaultProps = {
  className: '',
};

Title.propTypes = {
  className: PropTypes.string,
};

export default Title;
