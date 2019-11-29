import React from 'react';

export default () => (
  <div className="six">

    <div className="sixth-component">
      <h1 style={{
        color: 'white', position: 'relative', top: '30px', left: '20px',
      }}
      >
        <b>Contact</b>
      </h1>

      <div className="mapouter">
        <div className="gmap_canvas">
          <h2><b>Location</b></h2>
          <br />
          <br />
          <iframe
            width="600"
            height="500"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          />
          <a href="https://www.embedgooglemap.net/blog/nordvpn-coupon-code/">norevpn</a>
        </div>
      </div>
    </div>
  </div>
);
