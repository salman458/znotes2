import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
  FlexBox,
  Link,
  Image,
  IconButton,
} from '/client/components/atoms';
import {
  Community,
  Explore,
  Home,
  Team,
  Menu,
} from '/client/components/icons';

const NavigationIcons = {
  home: Home,
  explore: Explore,
  community: Community,
  team: Team,
};

const NavigationItems = [
  {
    title: 'home',
    to: '/',
  },
  {
    title: 'explore',
    to: '/explore',
  },
  {
    title: 'community',
    to: '/community',
  },
  {
    title: 'team',
    to: '/team',
  },
];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  headerText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Navigation = ({
  open,
  withSidebar,
  handleDrawerOpen,
}) => {
  const classes = useStyles();
  return (
    <FlexBox align className="organism_header-navigation">
      {withSidebar
        ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
        )
        : (
          <Link to="/">
            <Image
              className="organism_header-logo"
              src="/img/logo.png"
            />
          </Link>
        )}
      <FlexBox align>
        {NavigationItems.map(({ title, to }) => {
          const Icon = NavigationIcons[title];
          return (
            <Link key={title} to={to} className="organism_header-link">
              <FlexBox align>
                <Icon className="organism_header-icon" />
                <div className={classes.headerText}>
                  {title}
                </div>
              </FlexBox>
            </Link>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
};

Navigation.propTypes = {
  open: PropTypes.bool.isRequired,
  withSidebar: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default Navigation;
