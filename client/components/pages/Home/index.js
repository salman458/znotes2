import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Stickyroll } from '@stickyroll/stickyroll';
import { Pagers } from '@stickyroll/pagers';
import { Inner } from '@stickyroll/inner';
import { PermissionProvider } from '/client/contexts/permission';
import Landing from '../Landing';
import Story from '../Story';
import Process from '../Process';
import Testimonials from '../Testimonials';
import Hits from '../Hits';
import Dashboard from '../Dashboard';
import './styles.scss';

const content = [
  Landing,
  Hits,
  Story,
  Process,
  Testimonials,
];

const theme = {
  backgroundColor: '#051017',
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

const Home = ({ setOpaque }) => {
  if (Meteor.userId()) {
    document.title = 'ZNotes | Dashboard';
    return (
      <PermissionProvider>
        <Dashboard />
      </PermissionProvider>
    );
  }
  return (
    <>
      <Stickyroll pages={content} factor={0.5} offset={-70} anchors="" className="landing_container landing_root">
        {({
          pageIndex, progress,
        }) => {
          const Page = content[pageIndex];
          setOpaque(pageIndex === 0);
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

Home.propTypes = {
  setOpaque: PropTypes.func.isRequired,
};

export default Home;
