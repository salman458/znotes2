import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useStyles from './styles.js';

const Layout = ({
  sidebarWidth,
  withSidebar,
  className,
  children,
  open,
  ...props
}) => {
  const classes = useStyles({ sidebarWidth, withSidebar });
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      {...props}
    >
      <div className={classes.drawerHeader} />
      {children}
    </main>
  );
};

Layout.defaultProps = {
  className: '',
};

Layout.propTypes = {
  sidebarWidth: PropTypes.number.isRequired,
  withSidebar: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default Layout;
