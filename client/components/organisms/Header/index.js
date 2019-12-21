import React, { useEffect, useState } from 'react';
import { FlexBox } from '/client/components/atoms';
import { GetPermissionLevel, USER_PERMISSIONS } from '/client/utils';
import Navigation from './Navigation';
import LoginPopup from './LoginPopup';
import UserMenu from './UserMenu';

const Header = () => {
  const [role, setRole] = useState(USER_PERMISSIONS.visiting);

  useEffect(() => {
    const currentPermission = GetPermissionLevel();
    setRole(currentPermission);
  }, []);

  return (
    <FlexBox align justifyBetween className="organism_header-root">
      <Navigation />
      {role === USER_PERMISSIONS.visiting
        ? <LoginPopup />
        : <UserMenu role={role} />}
    </FlexBox>
  );
};

export default Header;
