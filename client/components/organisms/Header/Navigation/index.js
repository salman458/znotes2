import React from 'react';
import {
  FlexBox,
  Link,
  Image,
} from '/client/components/atoms';
import {
  Community,
  Explore,
  Home,
  Team,
} from '/client/components/icons';

const NavigationIcons = {
  home: Home,
  explore: Explore,
  community: Community,
  team: Team,
};

const NavigationItems = [
  {
    title: 'home',
    to: '/',
  },
  {
    title: 'explore',
    to: '/explore',
  },
  {
    title: 'community',
    to: '/community',
  },
  {
    title: 'team',
    to: '/team',
  },
];

const Navigation = () => (
  <FlexBox center>
    <Link to="/">
      <Image
        className="logo-pic"
        src="/img/logo.png"
      />
    </Link>
    <FlexBox center>
      {NavigationItems.map(({ title, to }) => {
        const Icon = NavigationIcons[title];
        return (
          <Link to={to}>
            <FlexBox center>
              <Icon />
              {title}
            </FlexBox>
          </Link>
        );
      })}
    </FlexBox>
  </FlexBox>
);

export default Navigation;
