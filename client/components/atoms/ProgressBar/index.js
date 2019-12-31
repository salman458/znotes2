import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
  },
  thin: {
    height: 4,
  },
  bar: {
    borderRadius: 20,
    background: 'linear-gradient(90deg, rgba(216,255,143,1) 0%, rgba(134,241,196,1) 100%)',
  },
}));

const ProgressBar = ({ className, thin, ...props }) => {
  const classes = useStyles();
  return (
    <LinearProgress
      classes={{
        determinate: clsx(classes.root, thin && classes.thin),
        bar1Determinate: classes.bar,
      }}
      {...props}
    />
  );
};

ProgressBar.defaultProps = {
  className: '',
  thin: false,
};

ProgressBar.propTypes = {
  thin: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressBar;
