import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "react-switch";
import "./styles.scss";
import { managementTeam, contributorTeam } from "./data";

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      num: "",
      checked: false,
      contributor: true
    };
  }

  componentDidMount() {
    // Meteor.call("getTeam", {}, (err, res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     this.setState({
    //       users: res.filter(user => user.emails !== undefined)
    //     });
    //     this.setState({ num: res.length });
    //   }
    // });
  }

  renderButtons = () => {
    return (
      <div className="r-buttons">
        <a
          onClick={() => {
            this.setState({ contributor: true });
          }}
          href="#"
          className={`c-button ${this.state.contributor
            ? " active"
            : ""} aos-init aos-animate`}
          data-aos="zoom-in"
          data-aos-easing="ease-out"
          data-aos-delay="300"
        >
          Contributors
        </a>
        <a
          onClick={() => {
            this.setState({ contributor: false });
          }}
          href="#"
          className={`m-button ${!this.state.contributor
            ? " active"
            : ""} aos-init aos-animate`}
          data-aos="zoom-in"
          data-aos-easing="ease-out"
          data-aos-delay="600"
        >
          Management
        </a>
      </div>
    );
  };

  renderContributorTeam = () => {
    return (
      <div
        className="contributors aos-init"
        data-aos="zoom-in"
        data-aos-easing="ease-out"
        data-aos-delay="600"
        data-aos-duration="500"
      >
        {contributorTeam.map(member => {
          const { image, name, title, desc } = member;
          return (
            <div key={name} className="team-p">
              <div className="profile-pic">
                <img src={image} />
              </div>
              <div className="info-p-wrap">
                <div className="n-title">
                  {name}
                </div>
                <div className="r-title">
                  {title}
                </div>
                <div className="r-desc">
                  {desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderManagementTeam = () => {
    return (
      <div
        className="contributors aos-init"
        data-aos="zoom-in"
        data-aos-easing="ease-out"
        data-aos-delay="600"
        data-aos-duration="500"
      >
        {managementTeam.map(member => {
          const { image, name, title, desc, linkedIn, gmail } = member;
          return (
            <div key={name} className="team-p">
              <div className="profile-pic">
                <img src={image} />
              </div>
              <div className="info-p-wrap">
                <div className="n-title">
                  {name}
                </div>
                <div className="r-title">
                  {title}
                </div>
                
                <div className="social-ta">
                  <a href={linkedIn}>
                    <i
                      className="fab fa-linkedin fa-3x"
                      style={{ color: "white" }}
                    />
                  </a>
                  <a href={gmail}>
                    <i
                      className="fas fa-envelope fa-3x"
                      style={{ color: "white" }}
                    />
                  </a>
                </div>
                <br />
                <div className="r-desc">
                  {desc}
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderTeams = () => {
    return (
      <div className="team-container">
        <div className="team-wrap">
          {this.state.contributor
            ? this.renderContributorTeam()
            : this.renderManagementTeam()}
        </div>
        {this.renderFooter()}
      </div>
    );
  };

  renderFooter = () => {
    return (
      <section id="t-contact">
        <div className="container">
          <div className="t-info">
            <h1>Join the team</h1>
            <p>Would you like to be part of ZNotes? Let us know!</p>
            <div className="join-now">
              <a
                className="Sbar-config MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
                href="https://forms.gle/5QLoEdwVpcdLLBZ86"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };

  renderBody() {
    return (
      <div className="something">
        {this.renderButtons()}
        {this.renderTeams()}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderBody()}
      </div>
    );
  }
}

export default Team;
