import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline',
    fontSize: 'inherit',
  },
}));

const TextBlock = ({ className, ...props }) => {
  const classes = useStyles();
  return (
    <Typography className={clsx(classes.root, className)} {...props} />
  );
};

TextBlock.defaultProps = {
  className: '',
  color: 'textPrimary',
};

TextBlock.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export default TextBlock;
