import React from 'react';
import clsx from 'clsx';
import { FlexBox, Link } from '/client/components/atoms';

import './styles.scss';

const SocialItems = [
  {
    icon: 'fab fa-facebook-square',
    to: 'https://www.facebook.com/znotes1/',
  },
  {
    icon: 'fab fa-instagram',
    to: 'https://instagram.com/znotesrevision',
  },
  {
    icon: 'fab fa-youtube',
    to: 'https://www.youtube.com/c/znotes',
  },
  {
    icon: 'fab fa-twitter',
    to: 'https://twitter.com/Znotesrevision',
  },
  {
    icon: 'fab fa-discord',
    to: 'https://discord.gg/wrZJ6kt',
  },
];

const Icons = () => (
  <FlexBox align justifyBetween className="organism_footer-icon-container">
    {SocialItems.map(({ icon, to }) => (
      <Link
        newPage
        key={to}
        to={to}
        className="organism_footer-icon-link"
      >
        <i className={clsx('organism_footer-icon', icon)} />
      </Link>
    ))}
  </FlexBox>
);

export default Icons;
