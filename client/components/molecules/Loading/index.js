import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '/client/components/icons';
import { FlexBox, IconButton } from '/client/components/atoms';
import './styles.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const Loading = ({ isLoading, onClose }) => (
  <Dialog
    open={isLoading}
    onClose={onClose}
      // className={className}
    aria-labelledby="molecule_close-popup-title"
    aria-describedby="molecule_close-popup-description"
  >
    <div className="loader">

      <Loader type="ThreeDots" color="#DA1D56" height={150} width={150} />
    </div>
  </Dialog>
);

Loading.defaultProps = {
  onClose: () => {},
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Loading;
