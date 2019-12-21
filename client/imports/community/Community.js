import React, { Component } from 'react';
import '../../styles/community.css';

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="home-page -padding-20">
        <div className="community">
          <ul>
            <li>
              <h1 className="communityHeader"><b>Our podcasts</b></h1>
              <div className="communityContainer">
                <iframe
                  src="https://open.spotify.com/embed-podcast/show/7jPpEntVVviSy0SNOqnZMq"
                  width="100%"
                  height="232"
                  frameBorder="0"
                  allow="encrypted-media"
                />
              </div>
            </li>
            <li>
              <h1 className="communityHeader"><b>Join the discussion</b></h1>
              <div className="communityContainer">
                <iframe
                  src="https://discordapp.com/widget?id=513750483572097034&amp;theme=dark"
                  width="100%"
                  height="232"
                  frameBorder="0"
                />
              </div>
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

export default Community;
