import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, TextField, Button } from '/client/components/atoms';
import { SanitizeName, Request, USER_PERMISSIONS } from '/client/utils';
import CardActionItem from './CardActionItem';
import ClosePopup from '../ClosePopup';
import Menu from '../Menu';

const useStyles = makeStyles((theme) => ({
  addSubjectButton: {
    color: theme.palette.primary.main,
  },
}));

const SubjectCard = ({
  id,
  role,
  code,
  subject,
  subjectName,
  isUserSubject,
  subjectNameSlug
}) => {
  const [modules, setModules] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();

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

    const moduleSlugName = await Request({
      action: 'getModuleSlugName',
      body: itemId ,
    });

    setModules([
      {
        _id: itemId,
        subject: id,
        name,
        chapters: [],
        slug:moduleSlugName
        // slug:name.split(" ").join('-')
      },
      ...modules,
    ]);
    onClose();
  };

  const addUserSubject = async () => {
    await Request({
      action: 'addSubjectToUser',
      body: {
        userId: Meteor.userId(),
        subjectId: id,
      },
    });
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
        placement="bottom-start"
        actionItem={(
          <CardActionItem
            code={code}
            subject={subject}
            subjectName={subjectName}
          />
  )}
      >
        {modules.map(({ _id, name: moduleName, slug:moduleNameSlug }) => (
          <Link
            key={_id}
            to={`/explore/module/${subjectNameSlug}/${moduleNameSlug}?subjectId=${id}&moduleId=${_id}`}
          >
            <MenuItem>{moduleName}</MenuItem>
          </Link>
        ))}
        {role > USER_PERMISSIONS.logged && (
          <MenuItem onClick={openPopup}>Add Module</MenuItem>
        )}
        {!isUserSubject && (
          <MenuItem
            className={classes.addSubjectButton}
            onClick={addUserSubject}
          >
            Add to My Subjects
          </MenuItem>
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

SubjectCard.defaultProps = {
  isUserSubject: false,
};

SubjectCard.propTypes = {
  role: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
  isUserSubject: PropTypes.bool,
};

export default SubjectCard;
