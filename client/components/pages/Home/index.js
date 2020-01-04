import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Stickyroll } from '@stickyroll/stickyroll';
import { Pagers } from '@stickyroll/pagers';
import { Inner } from '@stickyroll/inner';
import { PermissionProvider } from '/client/contexts/permission';
import Landing from '../Landing';
import Story from '../Story';
import Process from '../Process';
import Testimonials from '../Testimonials';
import Donate from '../Donate';
import Contact from '../Contact';
import Dashboard from '../Dashboard';

import './styles.scss';

const content = [
  Landing,
  Story,
  Process,
  Testimonials,
  Donate,
  Contact,
];

const theme = {
  backgroundColor: '#121212',
  color: 'white',
  markerColor: '#D82057',
  markerWidth: '2px',
  markerSize: '2px',
  pagerBackgroundColor: '#D82057',
  pagerColor: '#D82057',
  pagerColorActive: '#D82057',
  pagerGap: '2vh',
  pagerSize: '1.5rem',
  strokeWidth: '2px',
};

const Home = () => {
  if (Meteor.userId()) {
    return (
      <PermissionProvider>
        <Dashboard />
      </PermissionProvider>
    );
  }
  return (
    <>
      <Stickyroll pages={content} factor={1.3} anchors="" className="landing_container landing_root">
        {({
          pageIndex, progress,
        }) => {
          const Page = content[pageIndex];
          return (
            <Inner theme={theme} withPagers="right">
              <Page progress={progress} />
              <Pagers position="right" useContext />
            </Inner>
          );
        }}
      </Stickyroll>
    </>
  );
};

export default Home;
