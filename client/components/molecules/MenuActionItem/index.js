import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Text, FlexBox } from "/client/components/atoms";
import { MenuDown } from "/client/components/icons";
import { useUserData } from "/client/contexts/user";
import "./styles.scss";

const ActionItem = () => {
  const userData = useUserData();
  const { firstName = "", lastName = "", username = "" } = userData || {};
  const name = username ? username : firstName + " " + lastName;
  return (
    <FlexBox align className="molecule_menu-action-item">
      <Avatar className="molecule_menu-action-item-avatar">
        {/* {userData.username && userData.username.split('')[0]} */}
        {name && name.split("")[0]}
      </Avatar>
      <Text className="molecule_user-name">{name}</Text>
      <MenuDown className="molecule_user-menu-icon" />
    </FlexBox>
  );
};

export default ActionItem;
