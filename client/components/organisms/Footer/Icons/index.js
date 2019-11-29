import React from 'react';
import {
  Facebook,
  Instagram,
  Discord,
  Youtube,
  Twitter,
} from '/client/components/icons';
import { FlexBox, Link } from '/client/components/atoms';

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
    icon: Discord,
    to: 'https://discordapp.com',
  },
  {
    icon: Twitter,
    to: 'https://www.twitter.com',
  },
];

const Icons = () => (
  <FlexBox align justifyBetween>
    {SocialItems.map(({ icon: Icon, to }) => (
      <Link newPage key={to} to={to}>
        <Icon />
      </Link>
    ))}
  </FlexBox>
);

export default Icons;
