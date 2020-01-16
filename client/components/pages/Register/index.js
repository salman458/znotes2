import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import { Request } from '/client/utils';

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
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    livingPlace: '',
    birthPlace: '',
    school: '',
    schoolLocation: '',
    dob: null,
  });
  const [snackOpen, setSnackOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

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

  const createUser = () => {
    const { email, password, ...profileData } = userData;
    const credentials = {
      email,
      password,
    };
    Accounts.createUser(credentials, async (err) => {
      if (err) {
        throw err;
      } else {
        const userId = Meteor.userId();
        const res = await Request({
          action: 'extendProfile',
          body: { userId, fields: profileData },
        });
        setSnackOpen(true);
      }
    });
  };

  return (
    <>
      <FlexBox column justify align className="page_register-container">
        <Title
          variant="h3"
          gutterBottom
        >
      Sign Up
        </Title>
        <FormControl variant="outlined">
          <FlexBox justify align className="page_contact-wrapper">
            <TextField
              className="page_register-input page_register-input-margin"
              label="First Name"
              velue={userData.name}
              onChange={setTextField('firstName')}
            />
            <TextField
              className="page_register-input"
              label="Last Name"
              velue={userData.name}
              onChange={setTextField('lastName')}
            />
          </FlexBox>

          <FlexBox justify align className="page_contact-wrapper">
            <TextField
              className="page_register-input page_register-input-margin"
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
            value={userData.dob}
            onChange={setValueField('dob')}
            className="page_register-input"
          />
        </FormControl>
        <FormControl variant="outlined">
          <Select
            label="Gender"
            labelId="register-select-outlined-label"
            id="register-select-outlined"
            className="page_register-input"
            value={userData.gender}
            onChange={setTextField('gender')}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <FlexBox justify align className="page_contact-wrapper">
            <TextField
              className="page_register-input page_register-input-margin"
              onChange={setTextField('livingPlace')}
              value={userData.livingPlace}
              label="Living"
            />
            <TextField
              className="page_register-input"
              onChange={setTextField('birthPlace')}
              value={userData.birthPlace}
              label="Born"
            />
          </FlexBox>
          <FlexBox justify align className="page_contact-wrapper">
            <TextField
              className="page_register-input page_register-input-margin"
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
          onClick={createUser}
          className="page_submit-button"
        >
        Sign Up
        </Button>
      </FlexBox>
      <Snackbar
        message="Success! Check your email for a confirmation letter"
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      />
    </>
  );
};

export default Register;
