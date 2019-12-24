import React, { useEffect, useState } from 'react';
import { FlexBox } from '/client/components/atoms';
import { GetPermissionLevel, USER_PERMISSIONS } from '/client/utils';
import Navigation from './Navigation';
import LoginPopup from './LoginPopup';
import UserMenu from './UserMenu';

const Header = () => {
  const [role, setRole] = useState(USER_PERMISSIONS.visiting);

  useEffect(() => {
    const fetchPermissionLevel = async () => {
      const currentPermission = await GetPermissionLevel();
      setRole(currentPermission);
    };
    fetchPermissionLevel();
  }, []);

  const isVisiting = role === USER_PERMISSIONS.visiting;

  return (
    <FlexBox
      align
      justifyBetween
      className={`organism_header-root ${isVisiting ? '' : 'organism_header-with-bg'}`}
    >
      <Navigation />
      {isVisiting
        ? <LoginPopup />
        : <UserMenu role={role} />}
    </FlexBox>
  );
};

export default Header;
