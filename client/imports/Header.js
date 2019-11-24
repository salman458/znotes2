import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Login from './account/Login';
import iconService from './iconService';
import '../styles/loginButton.scss';

export default class Header extends Component {
  renderSingleItem(title, iconName, url) {
    return (
      <li className="header-navigation-item">
        <a className="-layout-h -space-h-8 -bold -font-size-16 -white " href={url}>
          <div>
            {iconService.getIcon(iconName)}
          </div>
          <div className="-layout-h -center ">
            <span>{title}</span>
          </div>
        </a>
      </li>
    );
  }

  renderNavigation() {
    return (
      <div className=" -layout-h -center -space-h-40">
        <a href="/">
          <img className="logo-pic" src="/img/logo.png" />
        </a>
        <ul className="-layout-h -space-h-20">
          {this.renderSingleItem('Home', 'home', '/')}
          {this.renderSingleItem('Explore', 'explore', '/explore')}
          {this.renderSingleItem('Community', 'community', '/community')}
          {this.renderSingleItem('Team', 'team', '/team')}
        </ul>
      </div>
    );
  }

  renderAccount() {
    return (
      <Login />
    );
  }

  renderAccountPopUp() {
    return (
      <Popup trigger={this.renderButton} modal>
        {(close) => (
          <div className="modal">
            <a className="close" onClick={close}>
                            &times;
            </a>
            {this.renderAccount()}
          </div>
        )}

      </Popup>
    );
  }

  renderButton() {
    return (
      <div className="button">
        <span>Account</span>
        <svg>
          <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
          <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
        </svg>
      </div>
    );
  }

  render() {
    return (
      <div className="-layout-h -justify">
        {this.renderNavigation()}
        {this.renderAccountPopUp()}

      </div>
    );
  }
}
