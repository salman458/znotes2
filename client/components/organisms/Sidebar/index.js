import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '/client/components/atoms';
import { ChevronLeft } from '/client/components/icons';

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
  withSidebar,
  sidebarWidth,
  handleDrawerClose,
}) => {
  const classes = useStyles({ sidebarWidth });

  return withSidebar && (
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
            chapters={[{}, {}, {}]}
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
            chapters={[{}, {}, {}]}
          />
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.defaultProps = {
  opaqueHeader: false,
  handleDrawerOpen: () => {},
};

Sidebar.propTypes = {
  opaqueHeader: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func,
  withSidebar: PropTypes.bool.isRequired,
  sidebarWidth: PropTypes.number.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default Sidebar;
