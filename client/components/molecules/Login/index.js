import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { TextField, Button, Link } from '/client/components/atoms';
import Paper from '@material-ui/core/Paper';
import './styles.scss';

const LoginPopup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPassChange = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    Meteor.loginWithPassword(email, password, ((err) => {
      if (err) {
        setError(err);
      } else {
        FlowRouter.go('/');
        // window.location.reload();
      }
    }));
  };

  return (
    <Paper className="molecule_login-container">
      <TextField
        onChange={onEmailChange}
        type="email"
        label="Email"
        className="molecule_login-field"
      />
      <TextField
        error={error}
        onChange={onPassChange}
        type="password"
        label="Password"
        className="molecule_login-field"
        helperText={error ? 'Invalid login and/or password' : ''}
      />
      <Button
        onClick={login}
        className="molecule_login-submit-button"
      >
        Submit
      </Button>
      <Link to="/password/reset">Forgot password?</Link>
      <Link to="/register">New to ZNotes?</Link>
    </Paper>
  );
};

export default LoginPopup;
