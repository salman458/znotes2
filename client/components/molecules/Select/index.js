import React, { useState, useEffect, useRef } from 'react';
import {
  makeStyles,
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MUISelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark,
      },
      '& .MuiSelect-icon': {
        color: theme.palette.primary.main,
      },
    },
    '& label.MuiInputLabel-shrink': {
      color: theme.palette.primary.main,
    },
  },
}));

const Select = ({
  label, labelId, className, ...props
}) => {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined">
      <InputLabel ref={inputLabel} id={labelId}>
        {label}
      </InputLabel>
      <MUISelect
        labelId={labelId}
        labelWidth={labelWidth}
        className={clsx(className, classes.root)}
        {...props}
      />
    </FormControl>
  );
};

Select.defaultProps = {
  className: '',
};

Select.propTypes = {
  className: PropTypes.string,
  labelId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;
