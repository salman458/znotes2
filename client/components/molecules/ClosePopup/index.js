import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '/client/components/icons';
import { FlexBox, IconButton } from '/client/components/atoms';
import './styles.scss';

const ClosePopup = ({
  title,
  open,
  onClose,
  children,
  className,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    className={className}
    aria-labelledby="molecule_close-popup-title"
    aria-describedby="molecule_close-popup-description"
  >
    <DialogTitle id="molecule_close-popup-title">
      <FlexBox align justifyBetween={!!title} justifyEnd={!title}>
        {title}
        <IconButton onClick={onClose}>
          <Close color="primary" />
        </IconButton>
      </FlexBox>
    </DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
  </Dialog>
);

ClosePopup.defaultProps = {
  className: '',
  title: '',
};

ClosePopup.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default ClosePopup;
