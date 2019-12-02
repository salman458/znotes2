import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
} from '@material-ui/core/styles';
import MUITextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#121212',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& label.MuiInputLabel-shrink': {
      color: theme.palette.primary.main,
    },
  },
}));

const TextField = ({ className, ...props }) => {
  const classes = useStyles();
  return (
    <MUITextField
      className={clsx(classes.root, className)}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

TextField.defaultProps = {
  className: '',
};

TextField.propTypes = {
  className: PropTypes.string,
};

export default TextField;
