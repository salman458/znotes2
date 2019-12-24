import { Meteor } from 'meteor/meteor';

const Request = ({ action, body = {}, callback }) => (
  Meteor.call(action, body, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      return callback(res);
    }
    return null;
  })
);

export default Request;
