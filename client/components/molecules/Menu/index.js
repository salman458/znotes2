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
  placement,
  closeOnClick,
  disablePortal,
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
      <Popper
        transition
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        disablePortal={disablePortal}
        className="molecule_icon-menu-popper"
      >
        {({ TransitionProps, placement: currentPlacement }) => (
          <Grow
            {...TransitionProps}
            className={`grow ${className} ${currentPlacement === 'bottom' ? 'top' : 'bottom'}`}
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
  disablePortal: PropTypes.bool,
  placement: PropTypes.string,
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
  placement: 'bottom',
  disablePortal: true,
  closeOnClick: true,
  onClick: () => {},
  className: '',
};

export default Menu;
