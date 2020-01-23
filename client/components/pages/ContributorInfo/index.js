import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
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
    title: '',
    bio: '',
    facebook: '',
    linkedIn: '',
  });
  const [snackOpen, setSnackOpen] = useState('');

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const setTextField = (fieldName) => (e) => {
    setProfileData({
      ...profileData,
      [fieldName]: e.target.value,
    });
  };

  const saveData = async () => {
    const {
      title, bio, facebook, linkedIn,
    } = profileData;
    const body = {
      userId: Meteor.userId(),
      fields: {
        bio,
        title,
        mediaLinks: [{ facebook }, { linkedIn }],
      },
    };
    await Request({
      action: 'extendProfile',
      body,
    });
    snackOpen(true);
  };

  return (
    <>
      <FlexBox column justify align className="page_contributor-info-container">
        <Title
          variant="h3"
          gutterBottom
        >
        Add Contributor Info
        </Title>
        <FormControl className="page_contributor-info-form" variant="outlined">
          <FormGroup>
            <TextField
              label="Your Title"
              velue={profileData.title}
              onChange={setTextField('title')}
              className="page_contributor-info-input"
            />
            <TextField
              label="Bio"
              velue={profileData.bio}
              onChange={setTextField('bio')}
              className="page_contributor-info-input"
            />
            <TextField
              label="Facebook Profile"
              velue={profileData.facebook}
              onChange={setTextField('facebook')}
              className="page_contributor-info-input"
            />
            <TextField
              label="LinkedIn Profile"
              velue={profileData.linkedIn}
              onChange={setTextField('linkedIn')}
              className="page_contributor-info-input"
            />
          </FormGroup>
        </FormControl>
        <Button
          onClick={saveData}
          className="page_contributor-info-submit-button"
        >
        Save Data
        </Button>
      </FlexBox>
      <Snackbar
        open={snackOpen}
        onClose={handleClose}
        autoHideDuration={6000}
        message="Data successfully saved!"
      />
    </>
  );
};

export default ProfileSettings;
