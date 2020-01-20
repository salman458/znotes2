import React, { useState } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';

import {
  FlexBox,
  Title,
  TextField,
  Button,
} from '/client/components/atoms';

const Register = () => {
  const [email, setEmail] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const createUser = () => {
    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        throw err;
      } else {
        setSnackOpen(true);
        FlowRouter.go('/');
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
      Reset Password
        </Title>
        <FormControl variant="outlined">
          <TextField
            label="Your email"
            velue={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <Button
          onClick={createUser}
          className="page_submit-button"
        >
        Reset Password
        </Button>
      </FlexBox>
      <Snackbar
        message="Success! Check your email for a reset link"
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      />
    </>
  );
};

export default Register;
