import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import { Request } from '/client/utils';

import SidebarContent from './SidebarContent';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: (props) => props.sidebarWidth,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: (props) => props.sidebarWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    backgroundColor: '#282828',
    width: (props) => props.sidebarWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Sidebar = ({
  open,
  subject,
  moduleId,
  sidebarWidth,
  handleDrawerClose,
}) => {
  const classes = useStyles({ sidebarWidth });
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const getNecessaryData = async () => {
      const { chapters: data } = await Request({
        action: 'getModuleById',
        body: moduleId,
      });
      setChapters(data);
    };
    getNecessaryData();
  }, []);

  return (
    <>
      <Hidden mdUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SidebarContent
            withIcon
            subject={subject}
            chapters={chapters}
            handleDrawerClose={handleDrawerClose}
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <SidebarContent
            subject={subject}
            chapters={chapters}
          />
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  subject: PropTypes.string.isRequired,
  moduleId: PropTypes.string.isRequired,
  sidebarWidth: PropTypes.number.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default Sidebar;
