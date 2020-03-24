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
  name,
  cards,
  onCardClick
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={toggleCollapse}>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cards.map(({ _id, title: cardName }) => (
            <ListItem onClick={()=>onCardClick({_id : _id,cardName})} key={_id} button className={classes.nested}>
              <ListItemText primary={cardName || 'No Title Found'} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

CollapseListItem.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CollapseListItem;
