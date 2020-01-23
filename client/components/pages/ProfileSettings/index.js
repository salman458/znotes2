import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useUserData } from '/client/contexts/user';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { Request } from '/client/utils';

import {
  Title,
  Button,
  FlexBox,
  TextField,
} from '/client/components/atoms';
import './styles.scss';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    email: '',
    password: '',
    oldPass: '',
  });
  const userData = useUserData();
  const [snack, setSnack] = useState('');

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack('');
  };

  const setTextField = (fieldName) => (e) => {
    setProfileData({
      ...profileData,
      [fieldName]: e.target.value,
    });
  };

  const changeEmail = async () => {
    const { email } = profileData;
    await Request({
      action: 'removeEmail',
      body: userData,
    });
    await Request({
      action: 'addEmail',
      body: {
        user: userData,
        email,
      },
    });
    await Request({
      action: 'sendVerification',
      body: userData,
    });
    setSnack('Email successfully changed! Check your new email for a verification letter.');
  };

  const changePassword = () => {
    const { password, oldPass } = profileData;
    Accounts.changePassword(oldPass, password, (err) => {
      if (err) {
        setSnack('Password change failed');
      } else {
        setSnack('Password successfully changed!');
      }
    });
  };

  const saveData = () => {
    const { email, password, oldPass } = profileData;
    if (email) {
      changeEmail();
    }
    if (password && oldPass) {
      changePassword();
    }
  };

  return (
    <>
      <FlexBox column justify align className="page_profile-settings-container">
        <Title
          variant="h3"
          gutterBottom
        >
      Profile Settings
        </Title>
        <FormControl className="page_profile-settings-form" variant="outlined">
          <FormLabel
            className="page_profile-settings-label"
            color="primary"
          >
            Change email
          </FormLabel>
          <FormGroup>
            <TextField
              label="New Email"
              velue={profileData.email}
              onChange={setTextField('email')}
              className="page_profile-settings-input"
            />
          </FormGroup>
        </FormControl>
        <FormControl className="page_profile-settings-form" variant="outlined">
          <FormLabel
            className="page_profile-settings-label"
            color="primary"
          >
            Change password
          </FormLabel>
          <FormGroup>
            <TextField
              type="password"
              label="Old Password"
              velue={profileData.oldPass}
              onChange={setTextField('oldPass')}
              className="page_profile-settings-input"
              inputProps={{ autoComplete: 'new-password' }}
            />
            <TextField
              type="password"
              label="New Password"
              velue={profileData.password}
              onChange={setTextField('password')}
              className="page_profile-settings-input"
              inputProps={{ autoComplete: 'new-password' }}
            />
          </FormGroup>
        </FormControl>
        <Button
          onClick={saveData}
          className="page_profile-settings-submit-button"
        >
        Save Data
        </Button>
      </FlexBox>
      <Snackbar
        message={snack}
        open={Boolean(snack)}
        onClose={handleClose}
        autoHideDuration={6000}
      />
    </>
  );
};

export default ProfileSettings;
