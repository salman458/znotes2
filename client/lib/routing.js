import React from 'react';
import {mount} from 'react-mounter';

import Home from '../../imports/ui/Home';
import Register from '../../imports/ui/account/Register';
import Reset from '../../imports/ui/account/Reset';
import PreReset from '../../imports/ui/account/PreReset';
import ChangeEmail from '../../imports/ui/account/ChangeEmail';
import ChangePassword from '../../imports/ui/account/ChangePassword';
import App from '../../imports/ui/App';
import {Accounts} from "meteor/accounts-base";


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

FlowRouter.route('/email/verify/:token', {
    name: 'EmailVerification',
    action: function (params, queryParams) {
        Accounts.verifyEmail(params.token, (error) => {
            if (error) {
                console.log('Failed to verify the email', error);
                alert('Failed to verify the email');
                FlowRouter.go('/');
            } else {
                console.log('The email is verified');
                alert('The email is verified');
                FlowRouter.go('/');
            }
        });
    }
});

FlowRouter.route('/password/reset/:token', {
    name: 'ResetPassword',
    action: function (params, queryParams) {
        mount(App, {
            main: <Reset token={params.token}/>
        });
    }
});

FlowRouter.route('/password/reset/', {
    name: 'GetResetToken',
    action: function (params, queryParams) {
        mount(App, {
            main: <PreReset/>
        });
    }
});

FlowRouter.route('/email/change', {
    name: 'ChangeEmail',
    action: function () {
        mount(App, {
            main: <ChangeEmail/>
        })
    }
});

FlowRouter.route('/password/change', {
    name: 'ChangePassword',
    action: function () {
        mount(App, {
            main: <ChangePassword/>
        })
    }
})