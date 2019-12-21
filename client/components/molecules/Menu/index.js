import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import './styles.scss';

const Menu = ({
  onClick,
  children,
  className,
  closeOnClick,
  actionItem,
  ...props
}) => {
  const [anchorEl, setAnchor] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    if (open) {
      setAnchor(null);
    } else {
      setAnchor(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const onMenuClick = () => {
    if (closeOnClick) {
      handleClose();
    }
    onClick();
  };

  return (
    <>
      <div role="button" tabIndex="0" onClick={handleClick}>
        {actionItem}
      </div>
      <Popper open={open} className="molecule_icon-menu-popper" anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            className={`grow ${className} ${placement === 'bottom' ? 'top' : 'bottom'}`}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onClick={onMenuClick} className="list" {...props}>
                  {children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

Menu.propTypes = {
  closeOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  actionItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

Menu.defaultProps = {
  closeOnClick: true,
  onClick: () => {},
  className: '',
};

export default Menu;
