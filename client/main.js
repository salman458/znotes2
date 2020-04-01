import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { PermissionProvider } from '/client/contexts/permission';

import {
  Cards,
  Home,
  Terms,
  Forgot,
  Explore,
  Privacy,
  Register,
  Community,
  ProfileSettings,
  ContributorInfo,
} from './components/pages';
import Editor from './imports/explore/Editor';
import Reset from './imports/account/Reset';
import Team from './imports/Team';
import Admin from './imports/Admin';
import Sponsor from './imports/Sponsor';
import App from './app';

FlowRouter.route('/', {
  name: 'Home',
  action() {
    document.title = 'ZNotes | For Students, By Students';
    mount(App, {
      opaqueHeader: true,
      content: (props) => <Home {...props} />,
    });
  },
});

FlowRouter.route('/community', {
  name: 'Community',
  action() {
    document.title = 'ZNotes | Community';
    mount(App, {
      content: (props) => <Community {...props} />,
    });
  },
});

FlowRouter.route('/team', {
  name: 'Team',
  action() {
    document.title = 'ZNotes | Community';
    mount(App, {
      content: (props) => <Team {...props} />,
    });
  },
});

FlowRouter.route('/register', {
  name: 'Register',
  action() {
    document.title = 'ZNotes | Sign Up';
    mount(App, {
      content: (props) => <Register {...props} />,
    });
  },
});

FlowRouter.route('/sponsorContent/:id', {
  name: 'AddSponsorContnet',
  action({ id }) {
    mount(App, {
      content: (props) => <Sponsor id={id} {...props} />,
    });
  },
});

// FlowRouter.route('/addBio', {
//   name: 'AddBio',
//   action() {
//     mount(App, {
//       content: (props) => <AddBio {...props} />,
//     });
//   },
// });

FlowRouter.route('/contributor', {
  name: 'ContributorInfo',
  action() {
    mount(App, {
      content: (props) => <ContributorInfo {...props} />,
    });
  },
});

FlowRouter.route('/email/verify/:token', {
  name: 'EmailVerification',
  action({ token }) {
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
  action({ token }) {
    document.title = 'ZNotes | Reset Password';
    mount(App, {
      content: (props) => <Reset token={token} {...props} />,
    });
  },
});

FlowRouter.route('/password/reset/', {
  name: 'GetResetToken',
  action() {
    mount(App, {
      content: (props) => <Forgot {...props} />,
    });
  },
});

// FlowRouter.route('/email/change', {
//   name: 'ChangeEmail',
//   action () {
//     mount(App, {
//       content: (props) => <ChangeEmail {...props} />,
//     });
//   },
// });

// FlowRouter.route('/password/change', {
//   name: 'ChangePassword',
//   action () {
//     mount(App, {
//       content: (props) => <ChangePassword {...props} />,
//     });
//   },
// });

FlowRouter.route('/profile/change', {
  name: 'ChangeProfile',
  action() {
    document.title = 'ZNotes | Change Profile';
    mount(App, {
      content: (props) => <ProfileSettings {...props} />,
    });
  },
});

FlowRouter.route('/explore', {
  name: 'Explore',
  action() {
    document.title = 'ZNotes | Explore';
    mount(App, {
      content: (props) => (
        <PermissionProvider>
          <Explore {...props} />
        </PermissionProvider>
      ),
    });
  },
});

FlowRouter.route('/:board', {
  name: 'Explore',
  action({ board }) {
    document.title = 'ZNotes | Explore';
    mount(App, {
      content: (props) => (
        <PermissionProvider>
          <Explore board={board} {...props} />
        </PermissionProvider>
      ),
    });
  },
});

// FlowRouter.route('/explore/module/:name/:subjectId', {
//   name: 'Module',
//   action ({ subjectId, name }) {
//     mount(App, {
//       content: <Module subjectId={subjectId} name={name} />,
//     });
//   },
// });

// FlowRouter.route('/explore/subject/:name', {
//   name: 'Subject',
//   action ({ name }, { subjectId }) {
//     document.title = `ZNotes | Explore ${name}`;
//     mount(App, {
//       content: (props) => (
//         <Modules
//           subjectName={name}
//           subjectId={subjectId}
//           {...props}
//         />
//       ),
//     });
//   },
// });

FlowRouter.route('/explore/module/:subject/:name', {
  name: 'Subject',
  action({ subject, name }, { moduleId, subjectId }) {
    document.title = `ZNotes | Learn ${name}`;
    mount(App, {
      withSidebar: true,
      moduleId,
      subject,
      content: (props) => <Cards moduleId={moduleId} subjectId={subjectId} {...props} />,
    });
  },
});

FlowRouter.route('/:board/:level/:subject/:module', {
  name: 'Subject',
  action(
    {
      board, level, subject, module,
    },
    {
      subjectId, moduleId, chapterId, cardId,
    },
  ) {
    document.title = `ZNotes | Learn ${name}`;
    mount(App, {
      withSidebar: true,
      moduleId,
      // subject,
      boardSlugName: board,
      levelSlugName: level,
      subjectSlugName: subject,
      moduleSlugName: module,
      chapterId,
      cardId,
      content: (props) => (
        <PermissionProvider>
          <Cards
            moduleId={moduleId}
            subjectId={subjectId}
            boardSlugName={board}
            levelSlugName={level}
            subjectSlugName={subject}
            moduleSlugName={module}
            chapterId={chapterId}
            cardId={cardId}
            {...props}
          />
        </PermissionProvider>
      ),
    });
  },
});

// FlowRouter.route('/explore/chapters/module/:moduleId/:subjectName/:cardId', {
//   name: 'Chapter',
//   action (params) {
//     mount(App, {
//       content: (props) => (
//         <Chapters
//           {...params}
//           {...props}
//         />
//       ),
//     });
//   },
// });

FlowRouter.route('/editor/:board/:level/:subject/:module', {
  name: 'Editor',
  action(params, params2) {
    mount(App, {
      content: (props) => <Editor {...params2} {...params} {...props} />,
    });
  },
});

FlowRouter.route('/privacy', {
  name: 'Privacy Policy',
  action() {
    document.title = 'ZNotes | Privacy Policy';
    mount(App, {
      content: (props) => <Privacy {...props} />,
    });
  },
});

FlowRouter.route('/terms', {
  name: 'Terms and Conditions',
  action() {
    document.title = 'ZNotes | Terms and Conditions';
    mount(App, {
      content: (props) => <Terms {...props} />,
    });
  },
});

FlowRouter.route('/admin/:offset/:limit', {
  name: 'Admin',
  action(params) {
    document.title = 'ZNotes | Admin';
    mount(App, {
      content: (props) => <Admin {...params} {...props} />,
    });
  },
});
