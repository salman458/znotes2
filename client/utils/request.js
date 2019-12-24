import { Meteor } from 'meteor/meteor';

const Request = ({ action, body = {} }) => new Promise((resolve, reject) => {
  Meteor.call(action, body, (err, res) => {
    if (err) {
      console.log(err);
      reject(err);
    } else {
      resolve(res);
    }
  });
});

export default Request;
