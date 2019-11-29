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
  <FlexBox align>
    <Link to="/">
      <Image
        className="organism_header-logo"
        src="/img/logo.png"
      />
    </Link>
    <FlexBox align>
      {NavigationItems.map(({ title, to }) => {
        const Icon = NavigationIcons[title];
        return (
          <Link key={title} to={to} className="organism_header-link">
            <FlexBox align>
              <Icon className="organism_header-icon" />
              {title}
            </FlexBox>
          </Link>
        );
      })}
    </FlexBox>
  </FlexBox>
);

export default Navigation;
