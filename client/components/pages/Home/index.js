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
import CookieConsent from "react-cookie-consent";
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

renderCookiesComponent = ()=>{
  if(!localStorage.getItem("cookieBannersDisplayed")){
    return (
      <CookieConsent   
       location="bottom"
        buttonText="Sure!!"
        cookieName="zNotesCookies"
        style={{ background: "#383838" }}
        buttonStyle={{ color: "#FFFFFF", fontSize: "13px",backgroundColor:"#DA1D56" }}
        expires={365} 
        debug={true}
        //  acceptOnScroll={true}
        onAccept={({ acceptedByScrolling }) => {
          localStorage.setItem("cookieBannersDisplayed","true")
          // if (acceptedByScrolling) {
          //     // triggered if user scrolls past threshold
          //     alert("Accept was triggered by user scrolling");
          // } else {
          //     alert("Accept was triggered by clicking the Accept button");
          // }
          }}
        // enableDeclineButton
        // onDecline={() => {alert("nay!")}}
      
      >
         This website uses cookies to enhance the user experience
      </CookieConsent>
    )
  } else return null

}

const Home = ({ setOpaque }) => {


  const onDownPress=()=>{
      console.log("onDownPress")
  }
  
  if (Meteor.userId()) {
    document.title = 'ZNotes | Dashboard';
    return (
      <PermissionProvider>
        <Dashboard />
        {renderCookiesComponent()}
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
              <Page progress={progress}  onDownPress={onDownPress}/>
              <Pagers position="right" useContext />
              {renderCookiesComponent()}
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
