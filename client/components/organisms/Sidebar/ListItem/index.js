import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandMore, ExpandLess } from '/client/components/icons';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CollapseListItem = ({
  items,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={toggleCollapse}>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItem button className={classes.nested}>
              <ListItemText primary="Chapter Name" />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

CollapseListItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CollapseListItem;
