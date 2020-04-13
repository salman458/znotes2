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
    password2:''
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


  
  // Validate Email
  const isEmail = (value)=> {
    const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(filter.test(value)) {
      return true;
    }
    return false;
  };


  const userValidation=(userData)=>{

    const {  
      firstName,
      lastName,
      gender,
      email,
      password,
      password2,
      livingPlace,
      dob
    } = userData
      if( 
        !firstName ||
        !lastName ||
        !gender||
        !email ||
        !password ||
        !password2 ||
        !livingPlace||
        !dob ||
        checked == false
        ){

          Bert.alert("Some Fields are missing", "danger", "growl-top-right");
          return false
      }
      if(!isEmail(email)){

          Bert.alert("Please use a valid email address", "danger", "growl-top-right");
          return false
      }
      if(password !== password2) {

          Bert.alert("Passwords do not match", "danger", "growl-top-right");
          return false;
      }
       return true
  }

  const createUser = () => {
 const {  
    firstName,
    lastName,
    gender,
    email,
    password,
    livingPlace,
    dob
  } = userData
    if(userValidation(userData)){
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
            body: { userId, fields: {
              lastName,
              gender,
              livingPlace,
              dob
            } },
          });
          const verifyEmail = await Request({
            action:"sendVerification",
            body:Meteor.user()
          })
          
          setSnackOpen(true);
        }
      });
    }

    return false

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
              className="page_register-input"
              onChange={setTextField('email')}
              value={userData.email}
              label="Email"
              type="email"
            />

          </FlexBox>
          <FlexBox justify align className="page_contact-wrapper">

          <TextField
              className="page_register-input page_register-input-margin"
              inputProps={{ autoComplete: 'new-password' }}
              onChange={setTextField('password')}
              value={userData.password}
              label="Password"
              type="password"
            />

          <TextField
              className="page_register-input"
              inputProps={{ autoComplete: 'new-password2' }}
              onChange={setTextField('password2')}
              value={userData.password2}
              label="Confirm Password"
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
