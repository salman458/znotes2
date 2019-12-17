import { Meteor } from 'meteor/meteor';
import Request from './request';

export const USER_PERMISSIONS = {
  visiting: 0,
  logged: 1,
  editor: 2,
  admin: 3,
};

const GetPermissionLevel = () => {
  const userId = Meteor.userId();
  let currentPermission = USER_PERMISSIONS.visiting;
  if (userId !== null) {
    currentPermission = USER_PERMISSIONS.logged;
    if (userId === '') {
      currentPermission = USER_PERMISSIONS.admin;
    } else {
      Request({
        action: 'findUserRole',
        body: Meteor.userId(),
        callback: (userRole) => {
          if (userRole[0].userRole === 'team') {
            currentPermission = USER_PERMISSIONS.editor;
          }
        },
      });
    }
  }

  return currentPermission;
};

export default GetPermissionLevel;
