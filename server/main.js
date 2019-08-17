import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo'
import {Accounts} from 'meteor/accounts-base';

const noteSchema = require('./schemas/note.js');

const notes = new Mongo.Collection('notes');
notes.schema = noteSchema;


Accounts.urls.verifyEmail = (token) => {
    let url = Meteor.absoluteUrl("/email/verify/" + token);
    console.log(url);
    return url;
};
Accounts.urls.resetPassword = (token) => {
    let url = Meteor.absoluteUrl("/password/reset/" + token);
    console.log(url);
    return url;
};
Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});


Accounts.emailTemplates.enrollAccount.subject = (user) => {
    return `Welcome to Znotes, ${user.profile.name}`;
};
Accounts.emailTemplates.enrollAccount.text = (user, url) => {
    return ' To activate your account, simply click the link below:\n\n'
        + url;
};


Meteor.methods({
    // createUser(user) {
    //     users.schema.validate(user);
    //     users.insert(user);
    //     return "success";
    // },
    removeEmail(user) {
        let oldEmail = user.emails;
        if (oldEmail.length >= 1) {
            Accounts.removeEmail(user._id, user.emails[0].address)
        }
        return "old email was successfully removed";
    },
    addEmail(obj) {
        Accounts.addEmail(obj.user._id, obj.email);
    },
    sendVerification(user) {
        Meteor.users.update({_id: user._id}, {'$pop': {"services.email.verificationTokens": -1}});
        Accounts.sendVerificationEmail(user._id);
    },
    verify(token) {
        Accounts.verifyEmail(token, (error) => {
            if (error)
                console.log('Failed to verify the email');
            else
                console.log('The email is verified');
        });
    },
    extendProfile(obj) {

        return Meteor.users.update({_id: obj.userId}, {$set: obj.fields});
    },
    addUser(user) {
        Accounts.createUser(user);
    }
});


Meteor.startup(() => {

});
