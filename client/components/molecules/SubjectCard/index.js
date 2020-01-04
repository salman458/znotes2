import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, TextField, Button } from '/client/components/atoms';
import { Menu, ClosePopup } from '/client/components/molecules';
import { SanitizeName, Request, USER_PERMISSIONS } from '/client/utils';
import CardActionItem from './CardActionItem';

const SubjectCard = ({
  id,
  role,
  code,
  subject,
  subjectName,
}) => {
  const [modules, setModules] = useState([]);
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
      action: 'addZModule',
      body: { name, subject: id, chapters: [] },
    });
    setModules([
      {
        _id: itemId,
        subject: id,
        name,
        chapters: [],
      },
      ...modules,
    ]);
    onClose();
  };

  useEffect(() => {
    const getNecessaryData = async () => {
      const allModules = await Request({
        action: 'getModulesBySubject',
        body: id,
      });
      setModules(allModules);
    };
    getNecessaryData();
  }, []);

  return (
    <>
      <Menu
        disablePortal={false}
        actionItem={(
          <CardActionItem
            code={code}
            subject={subject}
            subjectName={subjectName}
          />
  )}
      >
        {modules.map(({ _id, name: moduleName }) => (
          <Link
            key={_id}
            to={`/explore/module/${subjectName}/${SanitizeName(moduleName)}?subjectId=${id}&moduleId=${_id}`}
          >
            <MenuItem>{name}</MenuItem>
          </Link>
        ))}
        {role > USER_PERMISSIONS.logged && (
        <MenuItem onClick={openPopup}>Add Module</MenuItem>
        )}
      </Menu>
      <ClosePopup
        open={open}
        onClose={onClose}
        title="Add a new module"
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

SubjectCard.propTypes = {
  role: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
};

export default SubjectCard;
