import React from 'react';
import { FlexBox, Text, Link } from '/client/components/atoms';
import Icons from './Icons';

import './styles.scss';

const Footer = () => (
  <FlexBox align justifyBetween className="organism_footer-root">
    <Text>
Made with
      {' '}
      {'<3'}
      {' '}
by Znotes team
    </Text>
    <Icons />
    <FlexBox align justifyBetween>
      <Link to="#">Terms of Use</Link>
      {' '}
      <Text>Copyright @ 2019 ZNotes</Text>
    </FlexBox>
  </FlexBox>
);

export default Footer;
