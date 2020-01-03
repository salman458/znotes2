import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { FlexBox } from '/client/components/atoms';
import { USER_PERMISSIONS } from '/client/utils';
import { usePermission } from '/client/contexts/permission';
import useStyles from './styles';
import Navigation from './Navigation';
import LoginPopup from './LoginPopup';
import UserMenu from './UserMenu';

const Header = ({
  open,
  withSidebar,
  sidebarWidth,
  opaqueHeader,
  handleDrawerOpen,
}) => {
  const role = usePermission();
  const classes = useStyles({ sidebarWidth, withSidebar });
  console.log(role);

  const isVisiting = role === USER_PERMISSIONS.visiting;

  return (
    <FlexBox>
      <AppBar
        position="fixed"
        color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          [classes.opaque]: opaqueHeader && isVisiting,
        })}
      >
        <Toolbar>
          <Navigation
            open={open}
            withSidebar={withSidebar}
            handleDrawerOpen={handleDrawerOpen}
          />
          <div className={classes.grow} />
          {isVisiting
            ? <LoginPopup />
            : <UserMenu role={role} />}
        </Toolbar>
      </AppBar>
    </FlexBox>
  );
};

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  withSidebar: PropTypes.bool.isRequired,
  opaqueHeader: PropTypes.bool.isRequired,
  sidebarWidth: PropTypes.number.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default Header;
