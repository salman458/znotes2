import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const ConfirmationDialog = ({
  isShow,
  title,
  description,
  onSubmit,
  onClose,
  submitButtonText,
  cancelButtonText
}) => {


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    handleClose();
    onSubmit();
  };
  return (
    <div>
      <Dialog
        open={isShow}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelButtonText}
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            {submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmationDialog.defaultProps = {
  onClose: () => {},
  isShow: false,
  title: "Alert",
  description: "Are you sure you wish to perform this action?",
  onSubmit: () => {},
  onClose: () => {},
  submitButtonText: "Delete",
  cancelButtonText: "Cancel"
};

ConfirmationDialog.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ConfirmationDialog;
