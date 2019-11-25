import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';

import Home from './imports/home/Home';
import Explore from './imports/explore/Explore';
import Level from './imports/explore/Level';
import Subject from './imports/explore/Subject';
import Module from './imports/explore/Module';
import Chapters from './imports/explore/Chapters';
import Editor from './imports/explore/Editor';
import Register from './imports/account/Register';
import Reset from './imports/account/Reset';
import AddBio from './imports/account/AddBio';
import PreReset from './imports/account/PreReset';
import ChangeEmail from './imports/account/ChangeEmail';
import ChangePassword from './imports/account/ChangePassword';
import Community from './imports/community/Community';
import Team from './imports/Team';
import Admin from './imports/Admin';
import Sponsor from './imports/Sponsor';
import App from './app';

FlowRouter.route('/', {
  name: 'Home',
  action() {
    mount(App, {
      content: <Home />,
    });
  },
});

FlowRouter.route('/community', {
  name: 'Community',
  action() {
    mount(App, {
      content: <Community />,
    });
  },
});

FlowRouter.route('/team', {
  name: 'Team',
  action() {
    mount(App, {
      content: <Team />,
    });
  },
});

FlowRouter.route('/register', {
  name: 'Register',
  action() {
    mount(App, {
      content: <Register />,
    });
  },
});

FlowRouter.route('/sponsorContent/:id', {
  name: 'AddSponsorContnet',
  action ({ id }) {
    mount(App, {
      content: <Sponsor id={id} />,
    });
  },
});

FlowRouter.route('/addBio', {
  name: 'AddBio',
  action() {
    mount(App, {
      content: <AddBio />,
    });
  },
});

FlowRouter.route('/email/verify/:token', {
  name: 'EmailVerification',
  action ({ token }) {
    Accounts.verifyEmail(token, (error) => {
      if (error) {
        console.log('Failed to verify the email', error);
      } else {
        console.log('The email is verified');
      }
      FlowRouter.go('/');
    });
  },
});

FlowRouter.route('/password/reset/:token', {
  name: 'ResetPassword',
  action ({ token }) {
    mount(App, {
      content: <Reset token={token} />,
    });
  },
});

FlowRouter.route('/password/reset/', {
  name: 'GetResetToken',
  action () {
    mount(App, {
      content: <PreReset />,
    });
  },
});

FlowRouter.route('/email/change', {
  name: 'ChangeEmail',
  action () {
    mount(App, {
      content: <ChangeEmail />,
    });
  },
});

FlowRouter.route('/password/change', {
  name: 'ChangePassword',
  action () {
    mount(App, {
      content: <ChangePassword />,
    });
  },
});

FlowRouter.route('/explore', {
  name: 'Explore',
  action () {
    mount(App, {
      content: <Explore />,
    });
  },
});

FlowRouter.route('/explore/level/:id', {
  name: 'Level',
  action ({ id }) {
    mount(App, {
      content: <Level boardId={id} />,
    });
  },
});

FlowRouter.route('/explore/level/:id', {
  name: 'Level',
  action ({ id }) {
    mount(App, {
      content: <Level boardId={id} />,
    });
  },
});

FlowRouter.route('/explore/subject/:boardId/:levelId', {
  name: 'Subject',
  action ({ boardId, levelId }) {
    mount(App, {
      content: <Subject boardId={boardId} levelId={levelId} />,
    });
  },
});

FlowRouter.route('/explore/module/:name/:subjectId', {
  name: 'Module',
  action ({ subjectId, name }) {
    mount(App, {
      content: <Module subjectId={subjectId} name={name} />,
    });
  },
});

FlowRouter.route('/explore/chapters/module/:moduleId/:subjectName/:cardId', {
  name: 'Chapter',
  action ({ moduleId, subjectName, cardId }) {
    mount(App, {
      content: (
        <Chapters
          moduleId={moduleId}
          subjectName={subjectName}
          cardId={cardId}
        />
      ),
    });
  },
});

FlowRouter.route('/explore/chapters/editor/:moduleId/:subjectName/:chapterId/:cardId', {
  name: 'Editor',
  action ({
    moduleId,
    subjectName,
    chapterId,
    cardId,
  }) {
    mount(App, {
      content: (
        <Editor
          moduleId={moduleId}
          subjectName={subjectName}
          chapterId={chapterId}
          cardId={cardId}
        />
      ),
    });
  },
});

FlowRouter.route('/admin/:offset/:limit', {
  name: 'Admin',
  action ({ offset, limit }) {
    mount(App, {
      content: <Admin offset={offset} limit={limit} />,
    });
  },
});
