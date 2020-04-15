import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Menu, MenuActionItem } from "/client/components/molecules";
import { USER_PERMISSIONS } from "/client/utils";
import { resetGlobal } from "reactn";
const UserMenu = ({ role }) => {
  const goToPage = (route) => () => FlowRouter.go(route);

  const logout = () => {
    Meteor.logout(() => {
      FlowRouter.go("/");
      window.location.reload();
      resetGlobal({
        cardsData: [],
        userData: {},
        myAddedSubject: [],
      });
    });
  };

  return (
    <Menu actionItem={<MenuActionItem />}>
      <MenuItem onClick={goToPage("/profile/change")}>Change Profile</MenuItem>
      {role === USER_PERMISSIONS.admin && (
        <MenuItem onClick={goToPage("/admin/0/20")}>Admin Page</MenuItem>
      )}
      {role >= USER_PERMISSIONS.editor && (
        <MenuItem onClick={goToPage("/contributor")}>Add Bio</MenuItem>
      )}
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );
};

UserMenu.propTypes = {
  role: PropTypes.number.isRequired,
};

export default UserMenu;
