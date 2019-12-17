import React, { useEffect, useState } from 'react';
import { FlexBox } from '/client/components/atoms';
import { Request } from '/client/utils';
import Navigation from './Navigation';
import LoginPopup from './LoginPopup';

const USER_PERMISSIONS = {
  visiting: 0,
  logged: 1,
  editor: 2,
  admin: 3,
};

const Header = () => {
  const [role, setRole] = useState(USER_PERMISSIONS.visiting);

  useEffect(() => {
    if (Meteor.user()) {
      if (Meteor.userId()) {
        Request({
          action: 'findUserRole',
          callback: (role) => {
            if (role[0].role === 'team') {
              setRole(USER_PERMISSIONS.editor);
            }
          },
        });
      }
    }
  }, []);

  return (
    <FlexBox align justifyBetween className="organism_header-root">
      <Navigation />
      <LoginPopup />
    </FlexBox>
  );
};

export default Header;
