import React from 'react';
import {
  Facebook,
  Instagram,
  Discord,
  Youtube,
  Twitter,
} from '/client/components/icons';
import { FlexBox, Link } from '/client/components/atoms';

import './styles.scss';

const SocialItems = [
  {
    icon: Facebook,
    to: 'https://www.facebook.com',
  },
  {
    icon: Instagram,
    to: 'https://www.instagram.com',
  },
  {
    icon: Youtube,
    to: 'https://www.youtube.com',
  },
  {
    icon: Twitter,
    to: 'https://www.twitter.com',
  },
  {
    icon: Discord,
    to: 'https://discordapp.com',
  },
];

const Icons = () => (
  <FlexBox align justifyBetween className="organism-footer-icon-container">
    {SocialItems.map(({ icon: Icon, to }) => (
      <Link
        newPage
        key={to}
        to={to}
        className="organism_footer-icon-link"
      >
        <Icon className="organism_footer-icon" />
      </Link>
    ))}
  </FlexBox>
);

export default Icons;
