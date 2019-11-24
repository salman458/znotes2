import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '/client/components/icons';
import { FlexBox } from '/client/components/atoms';
import { IconButton } from '@material-ui/core';
import Login from '/client/imports/account/Login';

const LoginPopup = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
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
