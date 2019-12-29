import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

const board = require('./schemas/board.js');
const level = require('./schemas/level.js');
const subject = require('./schemas/subject.js');
const zModule = require('./schemas/zModule.js');
const card = require('./schemas/card.js');
const chapter = require('./schemas/chapter.js');
const sponsorCard = require('./schemas/sponsorCard.js');

const sponsorCards = new Mongo.Collection('sponsorCards');
sponsorCards.schema = sponsorCard;

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
  const url = Meteor.absoluteUrl(`/email/verify/${token}`);
  return url;
};
Accounts.urls.resetPassword = (token) => {
  const url = Meteor.absoluteUrl(`/password/reset/${token}`);
  return url;
};
Accounts.config({ sendVerificationEmail: true, forbidClientAccountCreation: false });

Accounts.emailTemplates.enrollAccount.subject = (user) => `Welcome to Znotes, ${user.profile.name}`;
Accounts.emailTemplates.enrollAccount.text = (user, url) => ` To activate your account, simply click the link below:\n\n${
  url}`;

Meteor.methods({
  // createUser(user) {
  //     users.schema.validate(user);
  //     users.insert(user);
  //     return "success";
  // },
  removeEmail(user) {
    const oldEmail = user.emails;
    if (oldEmail.length >= 1) {
      Accounts.removeEmail(user._id, user.emails[0].address);
    }
    return 'old email was successfully removed';
  },
  addEmail(obj) {
    Accounts.addEmail(obj.user._id, obj.email);
  },
  sendVerification(user) {
    Meteor.users.update({ _id: user._id }, { $pop: { 'services.email.verificationTokens': -1 } });
    Accounts.sendVerificationEmail(user._id);
  },
  verify(token) {
    Accounts.verifyEmail(token, (error) => {
      if (error) console.log('Failed to verify the email');
      else console.log('The email is verified');
    });
  },
  extendProfile(obj) {
    return Meteor.users.update({ _id: obj.userId }, { $set: obj.fields });
  },
  addUser(user) {
    Accounts.createUser(user);
  },
  loadAllData() {
    const records = boards.find({}).count();
    if (records === 0) {
      return [];
    }
    const allBoards = boards.find({}).fetch();
    /* As we need all the data we need to go 3 levels.
      We want to achive the following structure
      [
        {
          name: 1,
          levels: [
              {
                name: 1.1,
                board: 1,
                subjects: [
                  {
                    name: Math,
                    board: <board_id>
                    level: <level_id>
                    boardName: 1,
                    levelName: 1.1
                  }
                  {
                    name: Programming,
                    board: <board_id>
                    level: <level_id>
                    boardName: 1,
                    levelName: 1.1
                  }
                ]
              }
            ]
          }
        ]
        Of course, this sucks, but that's what you get
        when you use relational database ideas in
        non-relational databases
    */
    const result = allBoards.map(({ _id: boardId, name: boardName, ...rest }) => {
      const allLevels = levels.find({ board: boardId }).fetch();
      const allLevelsWithSubjects = allLevels.map(({
        _id: levelId,
        name: levelName,
        ...levelRest
      }) => {
        const allSubjects = subjects.find({ level: levelId }).fetch();
        const allSubjectsWithNames = allSubjects.map((subjectData) => ({
          ...subjectData,
          boardName,
          levelName,
        }));
        return {
          ...levelRest,
          name: levelName,
          board: boardName,
          subjects: allSubjectsWithNames,
        };
      });
      return {
        ...rest,
        name: boardName,
        levels: allLevelsWithSubjects,
      };
    });
    return result;
  },
  loadBoards(selector) {
    const records = boards.find(selector).count();
    if (records === 0) {
      return [];
    }
    const res = boards.find(selector).fetch();
    return res;
  },
  loadLevelsByBoardId(id) {
    const records = levels.find({ board: id }).count();
    if (records === 0) {
      return [];
    }
    const res = levels.find({ board: id }).fetch();
    return res;
  },
  loadSubjects(selector) {
    const records = subjects.find(selector).count();
    if (records === 0) {
      return [];
    }
    const res = subjects.find(selector).fetch();
    return res;
  },
  addSubject(subject) {
    return subjects.insert(subject);
  },
  addBoard(board) {
    return boards.insert(board);
  },
  addLevel(level) {
    return levels.insert(level);
  },
  loadModules(selector) {
    const records = modules.find(selector).count();
    if (records === 0) {
      return [];
    }
    const res = modules.find(selector).fetch();
    return res;
  },
  addZModule(module) {
    return modules.insert(module);
  },
  loadChapters(selector) {
    const records = chapters.find(selector).count();
    if (records === 0) {
      return [];
    }
    const res = chapters.find(selector, { sort: { created: 1 } }).fetch();
    return res;
  },
  addChapter(chapter) {
    return chapters.insert(chapter);
  },
  addCard(card) {
    return cards.insert(card);
  },
  getAllCards() {
    const records = cards.find({}).count();
    if (records === 0) {
      return [];
    }
    const res = cards.find({}).fetch();
    return res;
  },
  loadCards(id) {
    const records = cards.find({ _id: id }).count();
    if (records === 0) {
      return [];
    }
    const res = cards.find({ _id: id }).fetch();
    return res;
  },
  updateCard(obj) {
    return cards.update({ _id: obj.cardId }, {
      $set: {
        content: obj.content,
        data_updated: obj.data_updated,
        sortKey: obj.sortKey,
        title: obj.title,
        author: obj.author,
      },
    });
  },
  updateChapter(obj) {
    return modules.update({ _id: obj.moduleId }, { $push: { chapters: obj.chapter } });
  },
  addSubjectToUser(obj) {
    return Meteor.users.update({ _id: obj.userId }, { $push: { subjects: obj.subject } });
  },
  updateChapterWithCard(obj) {
    return chapters.update({ _id: obj.chapterId }, { $push: { cards: obj.cards } });
  },
  getKeywords(obj) {
    const records = modules.find({}, { fields: { name: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = modules.find({}, { fields: { name: 1, _id: 0 } }).fetch();
    return res;
  },
  getSubjectName(id) {
    const records = subjects.find({}, { fields: { name: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = subjects.find({}, { fields: { name: 1, _id: 0 } }).fetch();
    return res;
  },

  getSubjectKeywords(obj) {
    const records = subjects.find({}, { fields: { name: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = subjects.find({}, { fields: { name: 1, _id: 0 } }).fetch();
    return res;
  },
  getLevelKeywords(obj) {
    const records = levels.find({}, { fields: { name: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = levels.find({}, { fields: { name: 1, _id: 0 } }).fetch();
    return res;
  },
  getBoardKeywords(obj) {
    const records = boards.find({}, { fields: { name: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = boards.find({}, { fields: { name: 1, _id: 0 } }).fetch();
    return res;
  },
  getBoardKeyword(id) {
    const records = boards.find({ _id: id }, { fields: { name: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = boards.find({ _id: id }, { fields: { name: 1, _id: 0 } }).fetch();
    return res;
  },
  genericSearch(searchable) {
    let records;
    records = modules.find({ name: searchable }, { fields: { _id: 1 } }).count();
    if (records !== 0) {
      return {
        type: 'module',
        id: modules.find({ name: searchable }, { fields: { _id: 1 } }).fetch(),
      };
    }
    records = subjects.find({ name: searchable }, { fields: { _id: 1 } }).count();
    if (records !== 0) {
      return {
        type: 'subject',
        id: subjects.find({ name: searchable }, { fields: { _id: 1 } }).fetch(),
      };
    }
    records = levels.find({ name: searchable }, { fields: { _id: 1 } }).count();
    if (records !== 0) {
      return {
        type: 'level',
        id: levels.find({ name: searchable }, { fields: { _id: 1 } }).fetch(),
      };
    }
    records = boards.find({ name: searchable }, { fields: { _id: 1 } }).count();
    if (records !== 0) {
      return {
        type: 'board',
        id: boards.find({ name: searchable }, { fields: { _id: 1 } }).fetch(),
      };
    }
    return [];
  },
  getBoardIdByLevel(levelId) {
    const res = levels.find({ _id: levelId }).fetch();
    const level = res[0];
    return level.board;
  },
  loadSubjectName(id) {
    const res = subjects.find({ _id: id }).fetch();
    const subject = res[0];
    return subject.name;
  },
  getSubjectNameByModuleId(id) {
    const results = modules.find({ _id: id }).fetch();
    const res = results[0];
    const subjectId = res.subject;
    const subjectResults = subjects.find({ _id: subjectId }).fetch();
    const subjectRes = subjectResults[0];
    return subjectRes.name;
  },
  deleteCard(id) {
    return cards.remove({ _id: id });
  },
  removeCardRef(selector) {
    return chapters.update({ _id: selector.chapterId }, { $pull: { cards: { _id: selector.cardId } } });
  },
  getTeam(selector) {
    return Meteor.users.find({}).fetch();
  },
  getAllUsers(selector) {
    return Meteor.users.find({}, { skip: parseInt(selector.offset), limit: parseInt(selector.limit) }, { sort: { createdAt: -1 } }).fetch();
  },
  getAllSubjects() {
    const records = subjects.find({}).count();
    if (records === 0) {
      return [];
    }
    const allSubjects = subjects.find({}).fetch();
    const res = allSubjects.map(({ level: levelId, board: boardId, ...rest }) => {
      const { name: levelName } = levels.findOne({ _id: levelId });
      const { name: boardName } = boards.findOne({ _id: boardId });
      return {
        ...rest,
        level: levelId,
        board: boardId,
        levelName,
        boardName,
      };
    });
    return res;
  },
  findUserRole(id) {
    const records = Meteor.users.find({ _id: id }, { fields: { role: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = Meteor.users.find({ _id: id }, { fields: { role: 1, _id: 0 } }).fetch();
    return res;
  },
  findUserSubjects(id) {
    const records = Meteor.users.find({ _id: id }, { fields: { subjects: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = Meteor.users.find({ _id: id }, { fields: { subjects: 1, _id: 0 } }).fetch();
    return res;
  },
  getUserSubjects(id) {
    const records = Meteor.users.find({ _id: id }, { fields: { subjects: 1, _id: 0 } }).count();
    if (records === 0) {
      return [];
    }
    const res = Meteor.users.find({ _id: id }, { fields: { subjects: 1, _id: 0 } }).fetch();
    return res;
  },
  addLastPosition(obj) {
    Meteor.users.update(
      { _id: obj.userId, 'lastPositions.id': { $eq: obj.subject.id } },
      {
        $set: {
          'lastPositions.$.position': obj.subject.position,
          'lastPositions.$.progress': obj.subject.progress,
          'lastPositions.$.timestamp': new Date(),
          'lastPositions.$.moduleName': obj.subject.moduleName,
        },
      },
      {}, function (err, result) {
        if (err) {
          console.log(err);
        } else if (result != 1) {
          Meteor.users.upsert({ _id: obj.userId }, {
            $push: {
              lastPositions: {
                id: obj.subject.id,
                position: obj.subject.position,
                progress: obj.subject.progress,
                moduleName: obj.subject.moduleName,
                timestamp: new Date(),
              },
            },
          });
        }

        // if result.nMatched == 0 then make your $addToSet
        // because there are no query
      },
    );

    // return Meteor.users.upsert({_id: obj.userId}, {$push: {lastPositions: {id: obj.subject.id, position: obj.subject.position}}});
  },
  getUser(id) {
    const records = Meteor.users.find({ _id: id },
      { fields: { lastPositions: 1, _id: 0 } },
      { sort: { timestamp: 1 } }).count();
    if (records === 0) {
      return [];
    }
    const res = Meteor.users.find({ _id: id }, { fields: { lastPositions: 1, _id: 0 } }).fetch();
    return res;
  },
  getSubjectById(id) {
    const records = subjects.find({ _id: id }).count();
    if (records === 0) {
      return [];
    }
    const { level: levelId, board: boardId, ...rest } = subjects.findOne({ _id: id });
    const { name: levelName } = levels.findOne({ _id: levelId });
    const { name: boardName } = boards.findOne({ _id: boardId });
    return {
      ...rest,
      level: levelId,
      board: boardId,
      levelName,
      boardName,
    };
  },
  addSponsorContent(card) {
    const records = sponsorCards.find({ sponsor: card.sponsor }).count();
    if (records === 0) {
      return sponsorCards.insert(card);
    }
    if (card.isNew) {
      delete card.isNew;
      updateSponsorContent(card);
    } else {
      delete card.isNew;
      updateSponsorContentWithoutContent(card);
    }
  },
  getSponsorCard(id) {
    const records = sponsorCards.find({ sponsor: id }).count();
    if (records === 0) {
      return [];
    }
    const res = sponsorCards.find({ sponsor: id }).fetch();
    return res;
  },
  getAllSponsorCards(obj) {
    const records = sponsorCards.find({}).count();
    if (records === 0) {
      return [];
    }
    const res = sponsorCards.find({}).fetch();
    return res;
  },

});

function updateSponsorContent(card) {
  sponsorCards.update({ sponsor: card.sponsor }, {
    $push: {
      content: card.content[0],
    },
  }, {}, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      sponsorCards.update({ sponsor: card.sponsor }, {
        $set: {
          logo: card.logo,
          subjects: card.subjects,
        },
      });
    }
  });
}
function updateSponsorContentWithoutContent(card) {
  return sponsorCards.update({ sponsor: card.sponsor }, {
    $set: {
      logo: card.logo,
      subjects: card.subjects,
    },
  });
}

Meteor.startup(() => {

});
