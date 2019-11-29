import React from 'react';
import { FlexBox } from '/client/components/atoms';
import Navigation from './Navigation';
import LoginPopup from './LoginPopup';

const Header = () => (
  <FlexBox align justifyBetween className="organism_header-root">
    <Navigation />
    <LoginPopup />
  </FlexBox>
);

export default Header;
