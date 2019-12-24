import { Meteor } from 'meteor/meteor';
import Request from './request';

export const USER_PERMISSIONS = {
  visiting: 0,
  logged: 1,
  editor: 2,
  admin: 3,
};

const GetPermissionLevel = async () => {
  const userId = Meteor.userId();
  let currentPermission = USER_PERMISSIONS.visiting;
  if (userId !== null) {
    currentPermission = USER_PERMISSIONS.logged;
    if (userId === '') {
      currentPermission = USER_PERMISSIONS.admin;
    } else {
      const [{ role }] = await Request({
        action: 'findUserRole',
        body: Meteor.userId(),
      });
      if (role === 'team') {
        currentPermission = USER_PERMISSIONS.editor;
      }
    }
  }

  return currentPermission;
};

export default GetPermissionLevel;
