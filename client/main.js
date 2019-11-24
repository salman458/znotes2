import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from './app';
import './routing';

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
