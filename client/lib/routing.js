import React from 'react';
import { mount } from 'react-mounter';

import Home from '../../imports/ui/Home';
import Register from '../../imports/ui/Register';
import App from '../../imports/ui/App';


FlowRouter.route('/', {
    name: 'Home',
    action() {
        mount(App, {
            main: <Home/>,
        });
    },
});

FlowRouter.route('/register', {
    name: 'Register',
    action() {
        mount(App, {
            main: <Register/>,
        });
    },
});