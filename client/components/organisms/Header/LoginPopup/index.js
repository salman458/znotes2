import React, { useState } from 'react';
import { Button } from '/client/components/atoms';
import { ClosePopup, Login } from '/client/components/molecules';

const LoginPopup = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        color="primary"
        onClick={() => setOpen(true)}
      >
        Account
      </Button>
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
