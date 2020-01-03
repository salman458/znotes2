import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Request } from '/client/utils';
import {
  Title,
  Button,
  FlexBox,
  TextField,
} from '/client/components/atoms';
import { ClosePopup } from '/client/components/molecules';

const AddPopup = ({ addBoard }) => {
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
    const boardId = await Request({
      action: 'addBoard',
      body: { name },
    });
    addBoard({ boardId, name });
    onClose();
  };

  return (
    <>
      <FlexBox column align>
        <Title variant="h3" gutterBottom>Need to add a new board?</Title>
        <Button onClick={openPopup}>Add</Button>
      </FlexBox>
      <ClosePopup
        open={open}
        onClose={onClose}
        title="Add a new board"
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

AddPopup.propTypes = {
  addBoard: PropTypes.func.isRequired,
};

export default AddPopup;
