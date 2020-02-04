import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import endOfMonth from 'date-fns/endOfMonth';
import { ChevronLeft, ChevronRight, Today } from '/client/components/icons';
import TextField from '../TextField';

const DatePicker = ({
  value,
  label,
  onChange,
  ...props
}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      autoOk
      variant="inline"
      inputVariant="outlined"
      format="MM/dd/yyyy"
      label="Date of Birth"
      value={value}
      TextFieldComponent={TextField}
      onChange={onChange}
      maxDate={endOfMonth(new Date())}
      keyboardIcon={<Today color="primary" />}
      leftArrowIcon={<ChevronLeft color="primary" />}
      rightArrowIcon={<ChevronRight color="primary" />}
      {...props}
    />
  </MuiPickersUtilsProvider>
);

DatePicker.defaultProps = {
  value: null,
};

DatePicker.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
