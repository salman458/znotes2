import React, { useState } from 'react';
import { Button, Link } from '/client/components/atoms';
import { ClosePopup, Login } from '/client/components/molecules';

const LoginPopup = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        Log In
      </Button>
      <Link
        to="/register"
        className="organism_header-signup-button"
      >
        <Button
          color="primary"
        >
        Sign Up
        </Button>
      </Link>
      <ClosePopup
        open={open}
        onClose={handleClose}
        className="organism_header-login-popup"
      >
        <Login />
      </ClosePopup>
    </>
  );
};

export default LoginPopup;
