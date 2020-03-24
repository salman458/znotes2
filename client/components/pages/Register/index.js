import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';

import {
  Text,
  Link,
  Title,
  Button,
  FlexBox,
  TextField,
  DatePicker,
} from '/client/components/atoms';
import { Select, CountrySelector } from '/client/components/molecules';
import { Request } from '/client/utils';
import './styles.scss';

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    livingPlace: '',
    dob: null,
  });
  const [checked, setChecked] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
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
        const verifyEmail = await Request({
          action:"sendVerification",
          body:Meteor.user()
        })
        
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
          <CountrySelector
            labelId="register-select-country-outlined-label"
            id="register-select-country-outlined"
            className="page_register-input"
            value={userData.livingPlace}
            onChange={setTextField('livingPlace')}
          />
        </FormControl>
        <FormControlLabel
          control={(
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              color="primary"
            />
          )}
          label={(
            <Text>
          I accept ZNotes
              {'\' '}
              <Link className="page_register-link" to="/terms">Terms</Link>
              {' '}
          and
              {' '}
              <Link className="page_register-link" to="/privacy">Privacy Policy</Link>
            </Text>
          )}
        />
        <Button
          onClick={createUser}
          className="page_register-submit-button signUp"
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
