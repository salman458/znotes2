import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo'
import {Accounts} from 'meteor/accounts-base';

const board = require('./schemas/board.js');
const level = require('./schemas/level.js');
const subject = require('./schemas/subject.js');
const zModule = require('./schemas/zModule.js');
const card = require('./schemas/card.js');
const chapter = require('./schemas/chapter.js');

const boards = new Mongo.Collection('boards');
boards.schema = board;

const levels = new Mongo.Collection('levels');
levels.schema = level;

const subjects = new Mongo.Collection('subjects');
subjects.schema = subject;

const modules = new Mongo.Collection('modules');
modules.schema = zModule;

const cards = new Mongo.Collection('cards');
cards.schema = card;

const chapters = new Mongo.Collection('chapters');
chapters.schema = chapter;

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
    },
    loadBoards(selector) {
        let records = boards.find(selector).count();
        if (records === 0) {
            return [];
        } else {
            let res = boards.find(selector).fetch();
            console.log(res);
            return res;
        }
    },
    loadLevelsByBoardId(id) {
        let records = levels.find({board: id}).count();
        if (records === 0) {
            return [];
        } else {
            let res = levels.find({board: id}).fetch();
            console.log(res);
            return res;
        }
    },
    loadSubjects(selector) {
        let records = subjects.find(selector).count();
        if (records === 0) {
            return [];
        } else {
            let res = subjects.find(selector).fetch();
            console.log(res);
            return res;
        }
    },
    addSubject(subject) {
        return subjects.insert(subject);
    },
    addBoard(board) {
        return boards.insert(board);
    },
    addLevel(level) {
        console.log(level);
        return levels.insert(level);
    },
    loadModules(selector) {
        let records = modules.find(selector).count();
        if (records === 0) {
            return [];
        } else {
            let res = modules.find(selector).fetch();
            console.log(res);
            return res;
        }
    },
    addZModule(module) {
        return modules.insert(module);
    },
    loadChapters(selector) {
        let records = chapters.find(selector).count();
        if (records === 0) {
            return [];
        } else {
            let res = chapters.find(selector).fetch();
            console.log(res);
            return res;
        }
    },
    addChapter(chapter) {
        return chapters.insert(chapter);
    },
    updateChapter(obj) {
        console.log(obj);
        return modules.update({_id: obj.moduleId}, {$push: {chapters: obj.chapterId}})
    },
    getKeywords(obj) {
        let records = modules.find({}, {fields: {name: 1, _id: 0}}).count();
        if (records === 0) {
            return [];
        } else {
            let res = modules.find({}, {fields: {name: 1, _id: 0}}).fetch();
            console.log(res);
            return res;
        }
    },
    getSubjectKeywords(obj) {
        let records = subjects.find({}, {fields: {name: 1, _id: 0}}).count();
        if (records === 0) {
            return [];
        } else {
            let res = subjects.find({}, {fields: {name: 1, _id: 0}}).fetch();
            console.log(res);
            return res;
        }
    },
    getLevelKeywords(obj) {
        let records = levels.find({}, {fields: {name: 1, _id: 0}}).count();
        if (records === 0) {
            return [];
        } else {
            let res = levels.find({}, {fields: {name: 1, _id: 0}}).fetch();
            console.log(res);
            return res;
        }
    },
    getBoardKeywords(obj) {
        let records = boards.find({}, {fields: {name: 1, _id: 0}}).count();
        if (records === 0) {
            return [];
        } else {
            let res = boards.find({}, {fields: {name: 1, _id: 0}}).fetch();
            console.log(res);
            return res;
        }
    },
    genericSearch(searchable) {
        let records;
        records = modules.find({name: searchable}, {fields: {_id: 1}}).count();
        if (records !== 0) {
            return {
                type: 'module',
                id: modules.find({name: searchable}, {fields: {_id: 1}}).fetch()
            }
        } else {
            records = subjects.find({name: searchable}, {fields: {_id: 1}}).count();
            if (records !== 0) {
                return {
                    type: 'subject',
                    id: subjects.find({name: searchable}, {fields: {_id: 1}}).fetch()
                }
            } else {
                records = levels.find({name: searchable}, {fields: {_id: 1}}).count();
                if (records !== 0) {
                    return {
                        type: 'level',
                        id: levels.find({name: searchable}, {fields: {_id: 1}}).fetch()
                    }
                } else {
                    records = boards.find({name: searchable}, {fields: {_id: 1}}).count();
                    if (records !== 0) {
                        return {
                            type: 'board',
                            id: boards.find({name: searchable}, {fields: {_id: 1}}).fetch()
                        }
                    } else {
                        return [];
                    }
                }
            }
        }

    },
    getBoardIdByLevel(levelId) {
        let res = levels.find({_id: levelId}).fetch();
        let level = res[0];
        return level.board;
    },
    loadSubjectName(id) {
        let res = subjects.find({_id: id}).fetch();
        let subject = res[0];
        return subject.name;
    },
    getSubjectNameByModuleId(id) {
        let results = modules.find({_id: id}).fetch();
        let res = results[0];
        let subjectId = res.subject;
        let subjectResults = subjects.find({_id: subjectId}).fetch();
        let subjectRes = subjectResults[0];
        return subjectRes.name;
    }


});


Meteor.startup(() => {

});
