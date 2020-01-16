import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import {
  FlexBox,
  Title,
  TextField,
  Button,
  DatePicker,
} from '/client/components/atoms';
import { Select } from '/client/components/molecules';
import './styles.scss';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    living: '',
    born: '',
    school: '',
    schoolLocation: '',
    birthday: null,
  });

  const setTextField = (fieldName) => (e) => {
    setUserData({
      ...userData,
      [fieldName]: e.target.value,
    });
  };

  const setValueField = (fieldName) => (value) => {
    setUserData({
      ...userData,
      [fieldName]: value,
    });
  };

  return (
    <FlexBox column justify align className="page_register-container">
      <Title
        variant="h3"
        gutterBottom
      >
      Sign Up
      </Title>
      <FormControl variant="outlined">
        <TextField
          className="page_register-input"
          label="Full Name"
          velue={userData.name}
          onChange={setTextField('name')}
        />
        <FlexBox justify align className="page_contact-wrapper">
          <TextField
            className="page_register-input"
            onChange={setTextField('email')}
            value={userData.email}
            label="Email"
            type="email"
          />
          <TextField
            className="page_register-input"
            inputProps={{ autoComplete: 'new-password' }}
            onChange={setTextField('password')}
            value={userData.password}
            label="Password"
            type="password"
          />
        </FlexBox>
        <DatePicker
          label="Date of Birth"
          value={userData.birthday}
          onChange={setValueField('birthday')}
        />
      </FormControl>
      <FormControl variant="outlined">
        <Select
          label="Gender"
          labelId="register-select-outlined-label"
          id="register-select-outlined"
          inputProps={{ className: 'page_register-gender-input ' }}
          value={userData.gender}
          onChange={setTextField('gender')}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <FlexBox justify align className="page_contact-wrapper">
          <TextField
            className="page_register-input"
            onChange={setTextField('living')}
            value={userData.living}
            label="Living"
          />
          <TextField
            className="page_register-input"
            onChange={setTextField('born')}
            value={userData.born}
            label="Born"
          />
        </FlexBox>
        <FlexBox justify align className="page_contact-wrapper">
          <TextField
            className="page_register-input"
            onChange={setTextField('school')}
            value={userData.school}
            label="School Name"
          />
          <TextField
            className="page_register-input"
            onChange={setTextField('schoolLocation')}
            value={userData.schoolLocation}
            label="School Location"
          />
        </FlexBox>
      </FormControl>
      <Button
        className="page_submit-button"
        color="secondary"
      >
        Sign Up
      </Button>
    </FlexBox>
  );
};

export default Register;
