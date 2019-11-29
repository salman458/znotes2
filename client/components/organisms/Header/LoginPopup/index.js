import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '/client/components/icons';
import { FlexBox, Button, IconButton } from '/client/components/atoms';
import Login from '/client/imports/account/Login';

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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        aria-describedby="login-dialog-description"
      >
        <DialogTitle id="login-dialog-title">
          <FlexBox align justifyEnd>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </FlexBox>
        </DialogTitle>
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginPopup;
