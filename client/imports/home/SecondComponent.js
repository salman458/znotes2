import React from 'react';
import '../../styles/secondComponent.css';

export default () => (
  <div className="second-component">

    <ul>
      <li>
        <div className="secondContainer">
          <h1><b>What is ZNotes?</b></h1>
          <h2>An organisation started and run by students from across the world, dedicating their time and sharing their resources for the common goal: Making it possible for anyone, anywhere, to make life better through access to education</h2>
        </div>
      </li>
      <li>
        <iframe
          className="youtubeFrame"
          width="660"
          height="415"
          src="https://www.youtube.com/embed/-aBAsQxGzH0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </li>
    </ul>

  </div>
);
