import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Request } from '/client/utils';
import {
  Button,
  TextField,
} from '/client/components/atoms';
import { ClosePopup } from '/client/components/molecules';

const AddPopup = ({
  children,
  addData,
  action,
  onAdd,
  title,
}) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const openPopup = () => {
    setOpen(true);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async () => {
    const itemId = await Request({
      action,
      body: { name, ...addData },
    });
    onAdd({ itemId, name });
    onClose();
  };

  return (
    <>
      {children(openPopup)}
      <ClosePopup
        open={open}
        onClose={onClose}
        title={title}
      >
        <TextField
          style={{ marginBottom: 20 }}
          onChange={onChange}
          label="Name"
        />
        <Button onClick={onSubmit}>Add</Button>
      </ClosePopup>
    </>
  );
};

AddPopup.defaultProps = {
  addData: {},
};

AddPopup.propTypes = {
  children: PropTypes.func.isRequired,
  addData: PropTypes.shape({
    boardId: PropTypes.string,
    levelId: PropTypes.string,
  }),
  action: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default AddPopup;
