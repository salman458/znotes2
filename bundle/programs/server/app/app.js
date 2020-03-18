var require = meteorInstall({"server":{"schemas":{"board.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/schemas/board.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
boardSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'title'
  }
});
module.exports = boardSchema;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"card.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/schemas/card.js                                                                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
cardSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'title'
  },
  content: {
    type: String,
    label: 'content'
  },
  created: {
    type: Date,
    label: 'data_created'
  },
  updated: {
    type: Date,
    label: 'data_updated'
  },
  author: {
    type: Meteor.users.schema,
    label: 'author'
  },
  sortKey: {
    type: Number,
    label: 'sortKey'
  }
});
module.exports = cardSchema;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chapter.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/schemas/chapter.js                                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
const cardSchema = require('./card');

chapterSchema = new SimpleSchema({
  chapter: {
    type: String,
    label: 'name'
  },
  created: {
    type: Date,
    label: 'created'
  },
  sortKey: {
    type: Number,
    label: 'sortKey'
  },
  cards: {
    type: Array
  },
  'cards.$': {
    type: cardSchema
  }
});
module.exports = chapterSchema;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"level.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/schemas/level.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
const boardSchema = require('./board');

levelSchema = new SimpleSchema({
  board: {
    type: boardSchema,
    label: 'board'
  },
  name: {
    type: String,
    label: 'name'
  }
});
module.exports = levelSchema;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sponsorCard.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/schemas/sponsorCard.js                                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
schema = new SimpleSchema({
  title: {
    type: String,
    label: 'title'
  },
  sponsor: {
    type: String,
    label: 'sponsor'
  },
  logo: {
    type: String,
    label: 'logo'
  },
  content: {
    type: [Object],
    label: 'content'
  },
  created: {
    type: Date,
    label: 'created'
  },
  subjects: {
    type: [Object],
    label: 'subjects'
  }
});
module.exports = schema;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subject.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/schemas/subject.js                                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
const boardSchema = require('./board');

const levelSchema = require('./level');

subjectSchema = new SimpleSchema({
  board: {
    type: boardSchema,
    label: 'board'
  },
  level: {
    type: levelSchema,
    label: 'level'
  },
  name: {
    type: String,
    label: 'name'
  },
  color: {
    type: String,
    label: 'color'
  }
});
module.exports = subjectSchema;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"zModule.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/schemas/zModule.js                                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
const subjectSchema = require('./subject');

const chapterSchema = require('./chapter');

moduleSchema = new SimpleSchema({
  subject: {
    type: subjectSchema,
    label: 'subject'
  },
  name: {
    type: String,
    label: 'name'
  },
  chapters: {
    type: Array
  },
  'chapters.$': {
    type: chapterSchema
  }
});
module.exports = moduleSchema;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/main.js                                                                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

const module1 = module;
let Meteor;
module1.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Mongo;
module1.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 1);
let Accounts;
module1.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 2);
let boardSchema;
module1.link("./schemas/board.js", {
  default(v) {
    boardSchema = v;
  }

}, 3);
let levelSchema;
module1.link("./schemas/level.js", {
  default(v) {
    levelSchema = v;
  }

}, 4);
let subjectSchema;
module1.link("./schemas/subject.js", {
  default(v) {
    subjectSchema = v;
  }

}, 5);
let zModuleSchema;
module1.link("./schemas/zModule.js", {
  default(v) {
    zModuleSchema = v;
  }

}, 6);
let cardSchema;
module1.link("./schemas/card.js", {
  default(v) {
    cardSchema = v;
  }

}, 7);
let chapterSchema;
module1.link("./schemas/chapter.js", {
  default(v) {
    chapterSchema = v;
  }

}, 8);
let sponsorCardSchema;
module1.link("./schemas/sponsorCard.js", {
  default(v) {
    sponsorCardSchema = v;
  }

}, 9);
const sponsorCards = new Mongo.Collection('sponsorCards');
sponsorCards.schema = sponsorCardSchema;
const boards = new Mongo.Collection('boards');
boards.schema = boardSchema;
const levels = new Mongo.Collection('levels');
levels.schema = levelSchema;
const subjects = new Mongo.Collection('subjects');
subjects.schema = subjectSchema;
const modules = new Mongo.Collection('modules');
modules.schema = zModuleSchema;
const cards = new Mongo.Collection('cards');
cards.schema = cardSchema;
const chapters = new Mongo.Collection('chapters');
chapters.schema = chapterSchema;

Accounts.urls.verifyEmail = token => {
  const url = Meteor.absoluteUrl(`/email/verify/${token}`);
  return url;
};

Accounts.urls.resetPassword = token => {
  const url = Meteor.absoluteUrl(`/password/reset/${token}`);
  return url;
};

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});

Accounts.emailTemplates.enrollAccount.subject = user => `Welcome to Znotes, ${user.profile.name}`;

Accounts.emailTemplates.enrollAccount.text = (user, url) => ` To activate your account, simply click the link below:\n\n${url}`;

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
    Meteor.users.update({
      _id: user._id
    }, {
      $pop: {
        'services.email.verificationTokens': -1
      }
    });
    Accounts.sendVerificationEmail(user._id);
  },

  verify(token) {
    Accounts.verifyEmail(token, error => {
      if (error) console.log('Failed to verify the email');else console.log('The email is verified');
    });
  },

  extendProfile(obj) {
    return Meteor.users.update({
      _id: obj.userId
    }, {
      $set: obj.fields
    });
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

    const result = allBoards.map((_ref) => {
      let {
        _id: boardId,
        name: boardName
      } = _ref,
          rest = (0, _objectWithoutProperties2.default)(_ref, ["_id", "name"]);
      const allLevels = levels.find({
        board: boardId
      }).fetch();
      const allLevelsWithSubjects = allLevels.map((_ref2) => {
        let {
          _id: levelId,
          name: levelName
        } = _ref2,
            levelRest = (0, _objectWithoutProperties2.default)(_ref2, ["_id", "name"]);
        const allSubjects = subjects.find({
          level: levelId
        }).fetch();
        const allSubjectsWithNames = allSubjects.map(subjectData => (0, _objectSpread2.default)({}, subjectData, {
          boardName,
          levelName
        }));
        return (0, _objectSpread2.default)({}, levelRest, {
          levelId,
          name: levelName,
          board: boardName,
          subjects: allSubjectsWithNames
        });
      });
      return (0, _objectSpread2.default)({}, rest, {
        boardId,
        name: boardName,
        levels: allLevelsWithSubjects
      });
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
    const records = levels.find({
      board: id
    }).count();

    if (records === 0) {
      return [];
    }

    const res = levels.find({
      board: id
    }).fetch();
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

  getAllCardsByModule(moduleId) {
    const records = modules.find({
      _id: moduleId
    }).count();

    if (records === 0) {
      return [];
    }

    const moduleData = modules.findOne({
      _id: moduleId
    });
    const flatCards = moduleData.chapters.reduce((acc, {
      _id: chapterId
    }) => {
      const chapterData = chapters.findOne({
        _id: chapterId
      });
      const chapterCards = chapterData.cards.map(({
        _id: cardId
      }) => {
        const data = cards.findOne({
          _id: cardId
        });
        return data;
      });
      return [...acc, ...chapterCards];
    }, []);
    return flatCards;
  },

  getModuleById(moduleId) {
    const records = modules.find({
      _id: moduleId
    }).count();

    if (records === 0) {
      return [];
    }

    const moduleData = modules.findOne({
      _id: moduleId
    });
    const chaptersWithCards = moduleData.chapters.map((_ref3) => {
      let {
        _id: chapterId
      } = _ref3,
          rest = (0, _objectWithoutProperties2.default)(_ref3, ["_id"]);
      const chapterData = chapters.findOne({
        _id: chapterId
      });
      const chapterCards = chapterData.cards.map(({
        _id: cardId
      }) => {
        const data = cards.findOne({
          _id: cardId
        });
        return data;
      });
      return (0, _objectSpread2.default)({}, rest, chapterData, {
        cards: chapterCards
      });
    });
    return (0, _objectSpread2.default)({}, moduleData, {
      chapters: chaptersWithCards
    });
  },

  getModulesBySubject(subject) {
    const records = modules.find({
      subject
    }).count();

    if (records === 0) {
      return [];
    }

    const res = modules.find({
      subject
    }).fetch();
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

    const res = chapters.find(selector, {
      sort: {
        created: 1
      }
    }).fetch();
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
    const records = cards.find({
      _id: id
    }).count();

    if (records === 0) {
      return [];
    }

    const res = cards.find({
      _id: id
    }).fetch();
    return res;
  },

  updateCard(obj) {
    return cards.update({
      _id: obj.cardId
    }, {
      $set: {
        content: obj.content,
        data_updated: obj.data_updated,
        sortKey: obj.sortKey,
        title: obj.title,
        author: obj.author
      }
    });
  },

  updateChapter(obj) {
    return modules.update({
      _id: obj.moduleId
    }, {
      $push: {
        chapters: obj.chapter
      }
    });
  },

  addSubjectToUser({
    userId,
    subjectId
  }) {
    const subject = subjects.findOne({
      _id: subjectId
    });
    return Meteor.users.update({
      _id: userId
    }, {
      $push: {
        subjects: subject
      }
    });
  },

  updateChapterWithCard(obj) {
    return chapters.update({
      _id: obj.chapterId
    }, {
      $push: {
        cards: obj.cards
      }
    });
  },

  getChapterByCard(cardId) {
    let chapterId;
    const allChapters = chapters.find().forEach(function (chapter) {
      const card = chapter.cards.forEach(function (card) {
        if (card._id === cardId) {
          chapterId = chapter._id;
          return;
        }
      });
    });
    return chapterId;
  },

  getKeywords() {
    const records = modules.find({}).count();

    if (records === 0) {
      return [];
    }

    const allModules = modules.find({}, {
      fields: {
        _id: 0
      }
    }).fetch();
    const res = allModules.map(({
      subject: subjectId,
      name
    }) => {
      const {
        board,
        level,
        name: subjectName
      } = subjects.findOne({
        _id: subjectId
      });
      const {
        name: levelName
      } = levels.findOne({
        _id: level
      });
      const {
        name: boardName
      } = boards.findOne({
        _id: board
      });
      return {
        name,
        levelName,
        boardName,
        subjectName,
        type: 'module'
      };
    });
    return res;
  },

  getSubjectName(id) {
    const records = subjects.find({}, {
      fields: {
        name: 1,
        _id: 0
      }
    }).count();

    if (records === 0) {
      return [];
    }

    const res = subjects.find({}, {
      fields: {
        name: 1,
        _id: 0
      }
    }).fetch();
    return res;
  },

  getSubjectKeywords(obj) {
    const records = subjects.find({}).count();

    if (records === 0) {
      return [];
    }

    const allSubjects = subjects.find({}, {
      fields: {
        _id: 0
      }
    }).fetch();
    const res = allSubjects.map(({
      level: levelId,
      board: boardId,
      name
    }) => {
      const {
        name: levelName
      } = levels.findOne({
        _id: levelId
      });
      const {
        name: boardName
      } = boards.findOne({
        _id: boardId
      });
      return {
        name,
        levelName,
        boardName,
        type: 'subject'
      };
    });
    return res;
  },

  getLevelKeywords(obj) {
    const records = levels.find({}).count();

    if (records === 0) {
      return [];
    }

    const allLevels = levels.find({}, {
      fields: {
        _id: 0
      }
    }).fetch();
    const res = allLevels.map(({
      board: boardId,
      name
    }) => {
      const {
        name: boardName
      } = boards.findOne({
        _id: boardId
      });
      return {
        name,
        boardName,
        type: 'level'
      };
    });
    return res;
  },

  getBoardKeywords(obj) {
    const records = boards.find({}).count();

    if (records === 0) {
      return [];
    }

    const allBoards = boards.find({}, {
      fields: {
        name: 1,
        _id: 0
      }
    }).fetch();
    const res = allBoards.map(board => (0, _objectSpread2.default)({}, board, {
      type: 'board'
    }));
    return res;
  },

  getBoardKeyword(id) {
    const records = boards.find({
      _id: id
    }, {
      fields: {
        name: 1,
        _id: 0
      }
    }).count();

    if (records === 0) {
      return [];
    }

    const res = boards.find({
      _id: id
    }, {
      fields: {
        name: 1,
        _id: 0
      }
    }).fetch();
    return res;
  },

  genericSearch(searchable) {
    let records;
    records = modules.find({
      name: searchable
    }, {
      fields: {
        _id: 1
      }
    }).count();

    if (records !== 0) {
      return {
        type: 'module',
        id: modules.find({
          name: searchable
        }, {
          fields: {
            _id: 1
          }
        }).fetch()
      };
    }

    records = subjects.find({
      name: searchable
    }, {
      fields: {
        _id: 1
      }
    }).count();

    if (records !== 0) {
      return {
        type: 'subject',
        id: subjects.find({
          name: searchable
        }, {
          fields: {
            _id: 1
          }
        }).fetch()
      };
    }

    records = levels.find({
      name: searchable
    }, {
      fields: {
        _id: 1
      }
    }).count();

    if (records !== 0) {
      return {
        type: 'level',
        id: levels.find({
          name: searchable
        }, {
          fields: {
            _id: 1
          }
        }).fetch()
      };
    }

    records = boards.find({
      name: searchable
    }, {
      fields: {
        _id: 1
      }
    }).count();

    if (records !== 0) {
      return {
        type: 'board',
        id: boards.find({
          name: searchable
        }, {
          fields: {
            _id: 1
          }
        }).fetch()
      };
    }

    return [];
  },

  getBoardIdByLevel(levelId) {
    const res = levels.find({
      _id: levelId
    }).fetch();
    const level = res[0];
    return level.board;
  },

  loadSubjectName(id) {
    const res = subjects.find({
      _id: id
    }).fetch();
    const subject = res[0];
    return subject.name;
  },

  getSubjectNameByModuleId(id) {
    const results = modules.find({
      _id: id
    }).fetch();
    const res = results[0];
    const subjectId = res.subject;
    const subjectResults = subjects.find({
      _id: subjectId
    }).fetch();
    const subjectRes = subjectResults[0];
    return subjectRes.name;
  },

  deleteCard(id) {
    return cards.remove({
      _id: id
    });
  },

  removeCardRef(selector) {
    return chapters.update({
      _id: selector.chapterId
    }, {
      $pull: {
        cards: {
          _id: selector.cardId
        }
      }
    });
  },

  getTeam(selector) {
    return Meteor.users.find({}).fetch();
  },

  getAllUsers(selector) {
    return Meteor.users.find({}, {
      skip: parseInt(selector.offset),
      limit: parseInt(selector.limit)
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();
  },

  getAllSubjects() {
    const records = subjects.find({}).count();

    if (records === 0) {
      return [];
    }

    const allSubjects = subjects.find({}).fetch();
    const res = allSubjects.map((_ref4) => {
      let {
        level: levelId,
        board: boardId
      } = _ref4,
          rest = (0, _objectWithoutProperties2.default)(_ref4, ["level", "board"]);
      const {
        name: levelName
      } = levels.findOne({
        _id: levelId
      });
      const {
        name: boardName
      } = boards.findOne({
        _id: boardId
      });
      return (0, _objectSpread2.default)({}, rest, {
        level: levelId,
        board: boardId,
        levelName,
        boardName
      });
    });
    return res;
  },

  findUserRole(id) {
    const records = Meteor.users.find({
      _id: id
    }, {
      fields: {
        role: 1,
        _id: 0
      }
    }).count();

    if (records === 0) {
      return [];
    }

    const res = Meteor.users.find({
      _id: id
    }, {
      fields: {
        role: 1,
        _id: 0
      }
    }).fetch();
    return res;
  },

  findUserSubjects(id) {
    const records = Meteor.users.find({
      _id: id
    }, {
      fields: {
        subjects: 1,
        _id: 0
      }
    }).count();

    if (records === 0) {
      return [];
    }

    const res = Meteor.users.find({
      _id: id
    }, {
      fields: {
        subjects: 1,
        _id: 0
      }
    }).fetch();
    return res;
  },

  getUserSubjects(id) {
    const records = Meteor.users.find({
      _id: id
    }, {
      fields: {
        subjects: 1,
        _id: 0
      }
    }).count();

    if (records === 0) {
      return [];
    }

    const {
      subjects: allSubjects
    } = Meteor.users.findOne({
      _id: id
    }, {
      fields: {
        subjects: 1,
        _id: 0
      }
    });
    const res = allSubjects.map((_ref5) => {
      let {
        level: levelId,
        board: boardId
      } = _ref5,
          rest = (0, _objectWithoutProperties2.default)(_ref5, ["level", "board"]);
      const {
        name: levelName
      } = levels.findOne({
        _id: levelId
      });
      const {
        name: boardName
      } = boards.findOne({
        _id: boardId
      });
      return (0, _objectSpread2.default)({}, rest, {
        level: levelId,
        board: boardId,
        levelName,
        boardName
      });
    });
    return res;
  },

  addLastPosition(obj) {
    Meteor.users.update({
      _id: obj.userId,
      'lastPositions.id': {
        $eq: obj.subject.id
      }
    }, {
      $set: {
        'lastPositions.$.position': obj.subject.position,
        'lastPositions.$.progress': obj.subject.progress,
        'lastPositions.$.timestamp': new Date(),
        'lastPositions.$.moduleName': obj.subject.moduleName
      }
    }, {}, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result != 1) {
        Meteor.users.upsert({
          _id: obj.userId
        }, {
          $push: {
            lastPositions: {
              id: obj.subject.id,
              position: obj.subject.position,
              progress: obj.subject.progress,
              moduleName: obj.subject.moduleName,
              timestamp: new Date()
            }
          }
        });
      } // if result.nMatched == 0 then make your $addToSet
      // because there are no query

    }); // return Meteor.users.upsert({_id: obj.userId}, {$push: {lastPositions: {id: obj.subject.id, position: obj.subject.position}}});
  },

  getUser(id) {
    const records = Meteor.users.find({
      _id: id
    }, {
      fields: {
        lastPositions: 1,
        _id: 0
      }
    }, {
      sort: {
        timestamp: 1
      }
    }).count();

    if (records === 0) {
      return [];
    }

    const res = Meteor.users.find({
      _id: id
    }, {
      fields: {
        lastPositions: 1,
        _id: 0
      }
    }).fetch();
    return res;
  },

  getSubjectById(id) {
    const records = subjects.find({
      _id: id
    }).count();

    if (records === 0) {
      return [];
    }

    const _subjects$findOne = subjects.findOne({
      _id: id
    }),
          {
      level: levelId,
      board: boardId
    } = _subjects$findOne,
          rest = (0, _objectWithoutProperties2.default)(_subjects$findOne, ["level", "board"]);

    const {
      name: levelName
    } = levels.findOne({
      _id: levelId
    });
    const {
      name: boardName
    } = boards.findOne({
      _id: boardId
    });
    return (0, _objectSpread2.default)({}, rest, {
      level: levelId,
      board: boardId,
      levelName,
      boardName
    });
  },

  addSponsorContent(card) {
    const records = sponsorCards.find({
      sponsor: card.sponsor
    }).count();

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
    const records = sponsorCards.find({
      sponsor: id
    }).count();

    if (records === 0) {
      return [];
    }

    const res = sponsorCards.find({
      sponsor: id
    }).fetch();
    return res;
  },

  getAllSponsorCards(obj) {
    const records = sponsorCards.find({}).count();

    if (records === 0) {
      return [];
    }

    const res = sponsorCards.find({}).fetch();
    return res;
  }

});

function updateSponsorContent(card) {
  sponsorCards.update({
    sponsor: card.sponsor
  }, {
    $push: {
      content: card.content[0]
    }
  }, {}, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      sponsorCards.update({
        sponsor: card.sponsor
      }, {
        $set: {
          logo: card.logo,
          subjects: card.subjects
        }
      });
    }
  });
}

function updateSponsorContentWithoutContent(card) {
  return sponsorCards.update({
    sponsor: card.sponsor
  }, {
    $set: {
      logo: card.logo,
      subjects: card.subjects
    }
  });
}

Meteor.startup(() => {});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3NjaGVtYXMvYm9hcmQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9zY2hlbWFzL2NhcmQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9zY2hlbWFzL2NoYXB0ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9zY2hlbWFzL2xldmVsLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvc2NoZW1hcy9zcG9uc29yQ2FyZC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3NjaGVtYXMvc3ViamVjdC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3NjaGVtYXMvek1vZHVsZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsiYm9hcmRTY2hlbWEiLCJTaW1wbGVTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsImxhYmVsIiwibW9kdWxlIiwiZXhwb3J0cyIsImNhcmRTY2hlbWEiLCJ0aXRsZSIsImNvbnRlbnQiLCJjcmVhdGVkIiwiRGF0ZSIsInVwZGF0ZWQiLCJhdXRob3IiLCJNZXRlb3IiLCJ1c2VycyIsInNjaGVtYSIsInNvcnRLZXkiLCJOdW1iZXIiLCJyZXF1aXJlIiwiY2hhcHRlclNjaGVtYSIsImNoYXB0ZXIiLCJjYXJkcyIsIkFycmF5IiwibGV2ZWxTY2hlbWEiLCJib2FyZCIsInNwb25zb3IiLCJsb2dvIiwiT2JqZWN0Iiwic3ViamVjdHMiLCJzdWJqZWN0U2NoZW1hIiwibGV2ZWwiLCJjb2xvciIsIm1vZHVsZVNjaGVtYSIsInN1YmplY3QiLCJjaGFwdGVycyIsIm1vZHVsZTEiLCJsaW5rIiwidiIsIk1vbmdvIiwiQWNjb3VudHMiLCJkZWZhdWx0Iiwiek1vZHVsZVNjaGVtYSIsInNwb25zb3JDYXJkU2NoZW1hIiwic3BvbnNvckNhcmRzIiwiQ29sbGVjdGlvbiIsImJvYXJkcyIsImxldmVscyIsIm1vZHVsZXMiLCJ1cmxzIiwidmVyaWZ5RW1haWwiLCJ0b2tlbiIsInVybCIsImFic29sdXRlVXJsIiwicmVzZXRQYXNzd29yZCIsImNvbmZpZyIsInNlbmRWZXJpZmljYXRpb25FbWFpbCIsImZvcmJpZENsaWVudEFjY291bnRDcmVhdGlvbiIsImVtYWlsVGVtcGxhdGVzIiwiZW5yb2xsQWNjb3VudCIsInVzZXIiLCJwcm9maWxlIiwidGV4dCIsIm1ldGhvZHMiLCJyZW1vdmVFbWFpbCIsIm9sZEVtYWlsIiwiZW1haWxzIiwibGVuZ3RoIiwiX2lkIiwiYWRkcmVzcyIsImFkZEVtYWlsIiwib2JqIiwiZW1haWwiLCJzZW5kVmVyaWZpY2F0aW9uIiwidXBkYXRlIiwiJHBvcCIsInZlcmlmeSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImV4dGVuZFByb2ZpbGUiLCJ1c2VySWQiLCIkc2V0IiwiZmllbGRzIiwiYWRkVXNlciIsImNyZWF0ZVVzZXIiLCJsb2FkQWxsRGF0YSIsInJlY29yZHMiLCJmaW5kIiwiY291bnQiLCJhbGxCb2FyZHMiLCJmZXRjaCIsInJlc3VsdCIsIm1hcCIsImJvYXJkSWQiLCJib2FyZE5hbWUiLCJyZXN0IiwiYWxsTGV2ZWxzIiwiYWxsTGV2ZWxzV2l0aFN1YmplY3RzIiwibGV2ZWxJZCIsImxldmVsTmFtZSIsImxldmVsUmVzdCIsImFsbFN1YmplY3RzIiwiYWxsU3ViamVjdHNXaXRoTmFtZXMiLCJzdWJqZWN0RGF0YSIsImxvYWRCb2FyZHMiLCJzZWxlY3RvciIsInJlcyIsImxvYWRMZXZlbHNCeUJvYXJkSWQiLCJpZCIsImxvYWRTdWJqZWN0cyIsImFkZFN1YmplY3QiLCJpbnNlcnQiLCJhZGRCb2FyZCIsImFkZExldmVsIiwibG9hZE1vZHVsZXMiLCJnZXRBbGxDYXJkc0J5TW9kdWxlIiwibW9kdWxlSWQiLCJtb2R1bGVEYXRhIiwiZmluZE9uZSIsImZsYXRDYXJkcyIsInJlZHVjZSIsImFjYyIsImNoYXB0ZXJJZCIsImNoYXB0ZXJEYXRhIiwiY2hhcHRlckNhcmRzIiwiY2FyZElkIiwiZGF0YSIsImdldE1vZHVsZUJ5SWQiLCJjaGFwdGVyc1dpdGhDYXJkcyIsImdldE1vZHVsZXNCeVN1YmplY3QiLCJhZGRaTW9kdWxlIiwibG9hZENoYXB0ZXJzIiwic29ydCIsImFkZENoYXB0ZXIiLCJhZGRDYXJkIiwiY2FyZCIsImdldEFsbENhcmRzIiwibG9hZENhcmRzIiwidXBkYXRlQ2FyZCIsImRhdGFfdXBkYXRlZCIsInVwZGF0ZUNoYXB0ZXIiLCIkcHVzaCIsImFkZFN1YmplY3RUb1VzZXIiLCJzdWJqZWN0SWQiLCJ1cGRhdGVDaGFwdGVyV2l0aENhcmQiLCJnZXRDaGFwdGVyQnlDYXJkIiwiYWxsQ2hhcHRlcnMiLCJmb3JFYWNoIiwiZ2V0S2V5d29yZHMiLCJhbGxNb2R1bGVzIiwic3ViamVjdE5hbWUiLCJnZXRTdWJqZWN0TmFtZSIsImdldFN1YmplY3RLZXl3b3JkcyIsImdldExldmVsS2V5d29yZHMiLCJnZXRCb2FyZEtleXdvcmRzIiwiZ2V0Qm9hcmRLZXl3b3JkIiwiZ2VuZXJpY1NlYXJjaCIsInNlYXJjaGFibGUiLCJnZXRCb2FyZElkQnlMZXZlbCIsImxvYWRTdWJqZWN0TmFtZSIsImdldFN1YmplY3ROYW1lQnlNb2R1bGVJZCIsInJlc3VsdHMiLCJzdWJqZWN0UmVzdWx0cyIsInN1YmplY3RSZXMiLCJkZWxldGVDYXJkIiwicmVtb3ZlIiwicmVtb3ZlQ2FyZFJlZiIsIiRwdWxsIiwiZ2V0VGVhbSIsImdldEFsbFVzZXJzIiwic2tpcCIsInBhcnNlSW50Iiwib2Zmc2V0IiwibGltaXQiLCJjcmVhdGVkQXQiLCJnZXRBbGxTdWJqZWN0cyIsImZpbmRVc2VyUm9sZSIsInJvbGUiLCJmaW5kVXNlclN1YmplY3RzIiwiZ2V0VXNlclN1YmplY3RzIiwiYWRkTGFzdFBvc2l0aW9uIiwiJGVxIiwicG9zaXRpb24iLCJwcm9ncmVzcyIsIm1vZHVsZU5hbWUiLCJlcnIiLCJ1cHNlcnQiLCJsYXN0UG9zaXRpb25zIiwidGltZXN0YW1wIiwiZ2V0VXNlciIsImdldFN1YmplY3RCeUlkIiwiYWRkU3BvbnNvckNvbnRlbnQiLCJpc05ldyIsInVwZGF0ZVNwb25zb3JDb250ZW50IiwidXBkYXRlU3BvbnNvckNvbnRlbnRXaXRob3V0Q29udGVudCIsImdldFNwb25zb3JDYXJkIiwiZ2V0QWxsU3BvbnNvckNhcmRzIiwicmVzcCIsInN0YXJ0dXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLFdBQVcsR0FBRyxJQUFJQyxZQUFKLENBQWlCO0FBQzdCQyxNQUFJLEVBQUU7QUFDSkMsUUFBSSxFQUFFQyxNQURGO0FBRUpDLFNBQUssRUFBRTtBQUZIO0FBRHVCLENBQWpCLENBQWQ7QUFPQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCUCxXQUFqQixDOzs7Ozs7Ozs7OztBQ1BBUSxVQUFVLEdBQUcsSUFBSVAsWUFBSixDQUFpQjtBQUM1QlEsT0FBSyxFQUFFO0FBQ0xOLFFBQUksRUFBRUMsTUFERDtBQUVMQyxTQUFLLEVBQUU7QUFGRixHQURxQjtBQUs1QkssU0FBTyxFQUFFO0FBQ1BQLFFBQUksRUFBRUMsTUFEQztBQUVQQyxTQUFLLEVBQUU7QUFGQSxHQUxtQjtBQVM1Qk0sU0FBTyxFQUFFO0FBQ1BSLFFBQUksRUFBRVMsSUFEQztBQUVQUCxTQUFLLEVBQUU7QUFGQSxHQVRtQjtBQWE1QlEsU0FBTyxFQUFFO0FBQ1BWLFFBQUksRUFBRVMsSUFEQztBQUVQUCxTQUFLLEVBQUU7QUFGQSxHQWJtQjtBQWlCNUJTLFFBQU0sRUFBRTtBQUNOWCxRQUFJLEVBQUVZLE1BQU0sQ0FBQ0MsS0FBUCxDQUFhQyxNQURiO0FBRU5aLFNBQUssRUFBRTtBQUZELEdBakJvQjtBQXFCNUJhLFNBQU8sRUFBRTtBQUNQZixRQUFJLEVBQUVnQixNQURDO0FBRVBkLFNBQUssRUFBRTtBQUZBO0FBckJtQixDQUFqQixDQUFiO0FBMkJBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJDLFVBQWpCLEM7Ozs7Ozs7Ozs7O0FDM0JBLE1BQU1BLFVBQVUsR0FBR1ksT0FBTyxDQUFDLFFBQUQsQ0FBMUI7O0FBRUFDLGFBQWEsR0FBRyxJQUFJcEIsWUFBSixDQUFp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LEVBQStDO0FBQzdDd0QsWUFBSSxFQUFFO0FBQ0p2RCxjQUFJLEVBQUU2RyxJQUFJLENBQUM3RyxJQURQO0FBRUpFLGtCQUFRLEVBQUUyRyxJQUFJLENBQUMzRztBQUZYO0FBRHVDLE9BQS9DO0FBTUQ7QUFDRixHQWZEO0FBZ0JEOztBQUNELFNBQVNzSyxrQ0FBVCxDQUE0QzNELElBQTVDLEVBQWtEO0FBQ2hELFNBQU81RixZQUFZLENBQUM4QixNQUFiLENBQW9CO0FBQUVoRCxXQUFPLEVBQUU4RyxJQUFJLENBQUM5RztBQUFoQixHQUFwQixFQUErQztBQUNwRHdELFFBQUksRUFBRTtBQUNKdkQsVUFBSSxFQUFFNkcsSUFBSSxDQUFDN0csSUFEUDtBQUVKRSxjQUFRLEVBQUUyRyxJQUFJLENBQUMzRztBQUZYO0FBRDhDLEdBQS9DLENBQVA7QUFNRDs7QUFFRGYsTUFBTSxDQUFDeUwsT0FBUCxDQUFlLE1BQU0sQ0FFcEIsQ0FGRCxFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJib2FyZFNjaGVtYSA9IG5ldyBTaW1wbGVTY2hlbWEoe1xuICBuYW1lOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGxhYmVsOiAndGl0bGUnLFxuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYm9hcmRTY2hlbWE7XG4iLCJjYXJkU2NoZW1hID0gbmV3IFNpbXBsZVNjaGVtYSh7XG4gIHRpdGxlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGxhYmVsOiAndGl0bGUnLFxuICB9LFxuICBjb250ZW50OiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGxhYmVsOiAnY29udGVudCcsXG4gIH0sXG4gIGNyZWF0ZWQ6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIGxhYmVsOiAnZGF0YV9jcmVhdGVkJyxcbiAgfSxcbiAgdXBkYXRlZDoge1xuICAgIHR5cGU6IERhdGUsXG4gICAgbGFiZWw6ICdkYXRhX3VwZGF0ZWQnLFxuICB9LFxuICBhdXRob3I6IHtcbiAgICB0eXBlOiBNZXRlb3IudXNlcnMuc2NoZW1hLFxuICAgIGxhYmVsOiAnYXV0aG9yJyxcbiAgfSxcbiAgc29ydEtleToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBsYWJlbDogJ3NvcnRLZXknLFxuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2FyZFNjaGVtYTtcbiIsImNvbnN0IGNhcmRTY2hlbWEgPSByZXF1aXJlKCcuL2NhcmQnKTtcblxuY2hhcHRlclNjaGVtYSA9IG5ldyBTaW1wbGVTY2hlbWEoe1xuICBjaGFwdGVyOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGxhYmVsOiAnbmFtZScsXG4gIH0sXG4gIGNyZWF0ZWQ6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIGxhYmVsOiAnY3JlYXRlZCcsXG4gIH0sXG4gIHNvcnRLZXk6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgbGFiZWw6ICdzb3J0S2V5JyxcbiAgfSxcbiAgY2FyZHM6IHsgdHlwZTogQXJyYXkgfSxcbiAgJ2NhcmRzLiQnOiB7IHR5cGU6IGNhcmRTY2hlbWEgfSxcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjaGFwdGVyU2NoZW1hO1xuIiwiY29uc3QgYm9hcmRTY2hlbWEgPSByZXF1aXJlKCcuL2JvYXJkJyk7XG5cbmxldmVsU2NoZW1hID0gbmV3IFNpbXBsZVNjaGVtYSh7XG4gIGJvYXJkOiB7XG4gICAgdHlwZTogYm9hcmRTY2hlbWEsXG4gICAgbGFiZWw6ICdib2FyZCcsXG4gIH0sXG4gIG5hbWU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgbGFiZWw6ICduYW1lJyxcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxldmVsU2NoZW1hO1xuIiwic2NoZW1hID0gbmV3IFNpbXBsZVNjaGVtYSh7XG4gIHRpdGxlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGxhYmVsOiAndGl0bGUnLFxuICB9LFxuICBzcG9uc29yOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGxhYmVsOiAnc3BvbnNvcicsXG4gIH0sXG4gIGxvZ286IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgbGFiZWw6ICdsb2dvJyxcbiAgfSxcbiAgY29udGVudDoge1xuICAgIHR5cGU6IFtPYmplY3RdLFxuICAgIGxhYmVsOiAnY29udGVudCcsXG4gIH0sXG4gIGNyZWF0ZWQ6IHtcbiAgICB0eXBlOiBEYXRlLFxuICAgIGxhYmVsOiAnY3JlYXRlZCcsXG4gIH0sXG4gIHN1YmplY3RzOiB7XG4gICAgdHlwZTogW09iamVjdF0sXG4gICAgbGFiZWw6ICdzdWJqZWN0cycsXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzY2hlbWE7XG4iLCJjb25zdCBib2FyZFNjaGVtYSA9IHJlcXVpcmUoJy4vYm9hcmQnKTtcbmNvbnN0IGxldmVsU2NoZW1hID0gcmVxdWlyZSgnLi9sZXZlbCcpO1xuXG5zdWJqZWN0U2NoZW1hID0gbmV3IFNpbXBsZVNjaGVtYSh7XG4gIGJvYXJkOiB7XG4gICAgdHlwZTogYm9hcmRTY2hlbWEsXG4gICAgbGFiZWw6ICdib2FyZCcsXG4gIH0sXG4gIGxldmVsOiB7XG4gICAgdHlwZTogbGV2ZWxTY2hlbWEsXG4gICAgbGFiZWw6ICdsZXZlbCcsXG4gIH0sXG4gIG5hbWU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgbGFiZWw6ICduYW1lJyxcbiAgfSxcbiAgY29sb3I6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgbGFiZWw6ICdjb2xvcicsXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdWJqZWN0U2NoZW1hO1xuIiwiY29uc3Qgc3ViamVjdFNjaGVtYSA9IHJlcXVpcmUoJy4vc3ViamVjdCcpO1xuY29uc3QgY2hhcHRlclNjaGVtYSA9IHJlcXVpcmUoJy4vY2hhcHRlcicpO1xuXG5tb2R1bGVTY2hlbWEgPSBuZXcgU2ltcGxlU2NoZW1hKHtcbiAgc3ViamVjdDoge1xuICAgIHR5cGU6IHN1YmplY3RTY2hlbWEsXG4gICAgbGFiZWw6ICdzdWJqZWN0JyxcbiAgfSxcbiAgbmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBsYWJlbDogJ25hbWUnLFxuICB9LFxuICBjaGFwdGVyczogeyB0eXBlOiBBcnJheSB9LFxuICAnY2hhcHRlcnMuJCc6IHsgdHlwZTogY2hhcHRlclNjaGVtYSB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVTY2hlbWE7XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcbmltcG9ydCB7IEFjY291bnRzIH0gZnJvbSAnbWV0ZW9yL2FjY291bnRzLWJhc2UnO1xuXG5pbXBvcnQgYm9hcmRTY2hlbWEgZnJvbSAnLi9zY2hlbWFzL2JvYXJkLmpzJztcbmltcG9ydCBsZXZlbFNjaGVtYSBmcm9tICcuL3NjaGVtYXMvbGV2ZWwuanMnO1xuaW1wb3J0IHN1YmplY3RTY2hlbWEgZnJvbSAnLi9zY2hlbWFzL3N1YmplY3QuanMnO1xuaW1wb3J0IHpNb2R1bGVTY2hlbWEgZnJvbSAnLi9zY2hlbWFzL3pNb2R1bGUuanMnO1xuaW1wb3J0IGNhcmRTY2hlbWEgZnJvbSAnLi9zY2hlbWFzL2NhcmQuanMnO1xuaW1wb3J0IGNoYXB0ZXJTY2hlbWEgZnJvbSAnLi9zY2hlbWFzL2NoYXB0ZXIuanMnO1xuaW1wb3J0IHNwb25zb3JDYXJkU2NoZW1hIGZyb20gJy4vc2NoZW1hcy9zcG9uc29yQ2FyZC5qcyc7XG5cbmNvbnN0IHNwb25zb3JDYXJkcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdzcG9uc29yQ2FyZHMnKTtcbnNwb25zb3JDYXJkcy5zY2hlbWEgPSBzcG9uc29yQ2FyZFNjaGVtYTtcblxuY29uc3QgYm9hcmRzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2JvYXJkcycpO1xuYm9hcmRzLnNjaGVtYSA9IGJvYXJkU2NoZW1hO1xuXG5jb25zdCBsZXZlbHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignbGV2ZWxzJyk7XG5sZXZlbHMuc2NoZW1hID0gbGV2ZWxTY2hlbWE7XG5cbmNvbnN0IHN1YmplY3RzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3N1YmplY3RzJyk7XG5zdWJqZWN0cy5zY2hlbWEgPSBzdWJqZWN0U2NoZW1hO1xuXG5jb25zdCBtb2R1bGVzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ21vZHVsZXMnKTtcbm1vZHVsZXMuc2NoZW1hID0gek1vZHVsZVNjaGVtYTtcblxuY29uc3QgY2FyZHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignY2FyZHMnKTtcbmNhcmRzLnNjaGVtYSA9IGNhcmRTY2hlbWE7XG5cbmNvbnN0IGNoYXB0ZXJzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2NoYXB0ZXJzJyk7XG5jaGFwdGVycy5zY2hlbWEgPSBjaGFwdGVyU2NoZW1hO1xuXG5BY2NvdW50cy51cmxzLnZlcmlmeUVtYWlsID0gKHRva2VuKSA9PiB7XG4gIGNvbnN0IHVybCA9IE1ldGVvci5hYnNvbHV0ZVVybChgL2VtYWlsL3ZlcmlmeS8ke3Rva2VufWApO1xuICByZXR1cm4gdXJsO1xufTtcbkFjY291bnRzLnVybHMucmVzZXRQYXNzd29yZCA9ICh0b2tlbikgPT4ge1xuICBjb25zdCB1cmwgPSBNZXRlb3IuYWJzb2x1dGVVcmwoYC9wYXNzd29yZC9yZXNldC8ke3Rva2VufWApO1xuICByZXR1cm4gdXJsO1xufTtcbkFjY291bnRzLmNvbmZpZyh7IHNlbmRWZXJpZmljYXRpb25FbWFpbDogdHJ1ZSwgZm9yYmlkQ2xpZW50QWNjb3VudENyZWF0aW9uOiBmYWxzZSB9KTtcblxuQWNjb3VudHMuZW1haWxUZW1wbGF0ZXMuZW5yb2xsQWNjb3VudC5zdWJqZWN0ID0gKHVzZXIpID0+IGBXZWxjb21lIHRvIFpub3RlcywgJHt1c2VyLnByb2ZpbGUubmFtZX1gO1xuQWNjb3VudHMuZW1haWxUZW1wbGF0ZXMuZW5yb2xsQWNjb3VudC50ZXh0ID0gKHVzZXIsIHVybCkgPT4gYCBUbyBhY3RpdmF0ZSB5b3VyIGFjY291bnQsIHNpbXBseSBjbGljayB0aGUgbGluayBiZWxvdzpcXG5cXG4ke1xuICB1cmx9YDtcblxuTWV0ZW9yLm1ldGhvZHMoe1xuICAvLyBjcmVhdGVVc2VyKHVzZXIpIHtcbiAgLy8gICAgIHVzZXJzLnNjaGVtYS52YWxpZGF0ZSh1c2VyKTtcbiAgLy8gICAgIHVzZXJzLmluc2VydCh1c2VyKTtcbiAgLy8gICAgIHJldHVybiBcInN1Y2Nlc3NcIjtcbiAgLy8gfSxcbiAgcmVtb3ZlRW1haWwodXNlcikge1xuICAgIGNvbnN0IG9sZEVtYWlsID0gdXNlci5lbWFpbHM7XG4gICAgaWYgKG9sZEVtYWlsLmxlbmd0aCA+PSAxKSB7XG4gICAgICBBY2NvdW50cy5yZW1vdmVFbWFpbCh1c2VyLl9pZCwgdXNlci5lbWFpbHNbMF0uYWRkcmVzcyk7XG4gICAgfVxuICAgIHJldHVybiAnb2xkIGVtYWlsIHdhcyBzdWNjZXNzZnVsbHkgcmVtb3ZlZCc7XG4gIH0sXG4gIGFkZEVtYWlsKG9iaikge1xuICAgIEFjY291bnRzLmFkZEVtYWlsKG9iai51c2VyLl9pZCwgb2JqLmVtYWlsKTtcbiAgfSxcbiAgc2VuZFZlcmlmaWNhdGlvbih1c2VyKSB7XG4gICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh7IF9pZDogdXNlci5faWQgfSwgeyAkcG9wOiB7ICdzZXJ2aWNlcy5lbWFpbC52ZXJpZmljYXRpb25Ub2tlbnMnOiAtMSB9IH0pO1xuICAgIEFjY291bnRzLnNlbmRWZXJpZmljYXRpb25FbWFpbCh1c2VyLl9pZCk7XG4gIH0sXG4gIHZlcmlmeSh0b2tlbikge1xuICAgIEFjY291bnRzLnZlcmlmeUVtYWlsKHRva2VuLCAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvcikgY29uc29sZS5sb2coJ0ZhaWxlZCB0byB2ZXJpZnkgdGhlIGVtYWlsJyk7XG4gICAgICBlbHNlIGNvbnNvbGUubG9nKCdUaGUgZW1haWwgaXMgdmVyaWZpZWQnKTtcbiAgICB9KTtcbiAgfSxcbiAgZXh0ZW5kUHJvZmlsZShvYmopIHtcbiAgICByZXR1cm4gTWV0ZW9yLnVzZXJzLnVwZGF0ZSh7IF9pZDogb2JqLnVzZXJJZCB9LCB7ICRzZXQ6IG9iai5maWVsZHMgfSk7XG4gIH0sXG4gIGFkZFVzZXIodXNlcikge1xuICAgIEFjY291bnRzLmNyZWF0ZVVzZXIodXNlcik7XG4gIH0sXG4gIGxvYWRBbGxEYXRhKCkge1xuICAgIGNvbnN0IHJlY29yZHMgPSBib2FyZHMuZmluZCh7fSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBhbGxCb2FyZHMgPSBib2FyZHMuZmluZCh7fSkuZmV0Y2goKTtcbiAgICAvKiBBcyB3ZSBuZWVkIGFsbCB0aGUgZGF0YSB3ZSBuZWVkIHRvIGdvIDMgbGV2ZWxzLlxuICAgICAgV2Ugd2FudCB0byBhY2hpdmUgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmVcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IDEsXG4gICAgICAgICAgbGV2ZWxzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAxLjEsXG4gICAgICAgICAgICAgICAgYm9hcmQ6IDEsXG4gICAgICAgICAgICAgICAgc3ViamVjdHM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTWF0aCxcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQ6IDxib2FyZF9pZD5cbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDxsZXZlbF9pZD5cbiAgICAgICAgICAgICAgICAgICAgYm9hcmROYW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICBsZXZlbE5hbWU6IDEuMVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBQcm9ncmFtbWluZyxcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQ6IDxib2FyZF9pZD5cbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDxsZXZlbF9pZD5cbiAgICAgICAgICAgICAgICAgICAgYm9hcmROYW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICBsZXZlbE5hbWU6IDEuMVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgICBPZiBjb3Vyc2UsIHRoaXMgc3Vja3MsIGJ1dCB0aGF0J3Mgd2hhdCB5b3UgZ2V0XG4gICAgICAgIHdoZW4geW91IHVzZSByZWxhdGlvbmFsIGRhdGFiYXNlIGlkZWFzIGluXG4gICAgICAgIG5vbi1yZWxhdGlvbmFsIGRhdGFiYXNlc1xuICAgICovXG4gICAgY29uc3QgcmVzdWx0ID0gYWxsQm9hcmRzLm1hcCgoeyBfaWQ6IGJvYXJkSWQsIG5hbWU6IGJvYXJkTmFtZSwgLi4ucmVzdCB9KSA9PiB7XG4gICAgICBjb25zdCBhbGxMZXZlbHMgPSBsZXZlbHMuZmluZCh7IGJvYXJkOiBib2FyZElkIH0pLmZldGNoKCk7XG4gICAgICBjb25zdCBhbGxMZXZlbHNXaXRoU3ViamVjdHMgPSBhbGxMZXZlbHMubWFwKCh7XG4gICAgICAgIF9pZDogbGV2ZWxJZCxcbiAgICAgICAgbmFtZTogbGV2ZWxOYW1lLFxuICAgICAgICAuLi5sZXZlbFJlc3RcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgYWxsU3ViamVjdHMgPSBzdWJqZWN0cy5maW5kKHsgbGV2ZWw6IGxldmVsSWQgfSkuZmV0Y2goKTtcbiAgICAgICAgY29uc3QgYWxsU3ViamVjdHNXaXRoTmFtZXMgPSBhbGxTdWJqZWN0cy5tYXAoKHN1YmplY3REYXRhKSA9PiAoe1xuICAgICAgICAgIC4uLnN1YmplY3REYXRhLFxuICAgICAgICAgIGJvYXJkTmFtZSxcbiAgICAgICAgICBsZXZlbE5hbWUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5sZXZlbFJlc3QsXG4gICAgICAgICAgbGV2ZWxJZCxcbiAgICAgICAgICBuYW1lOiBsZXZlbE5hbWUsXG4gICAgICAgICAgYm9hcmQ6IGJvYXJkTmFtZSxcbiAgICAgICAgICBzdWJqZWN0czogYWxsU3ViamVjdHNXaXRoTmFtZXMsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnJlc3QsXG4gICAgICAgIGJvYXJkSWQsXG4gICAgICAgIG5hbWU6IGJvYXJkTmFtZSxcbiAgICAgICAgbGV2ZWxzOiBhbGxMZXZlbHNXaXRoU3ViamVjdHMsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIGxvYWRCb2FyZHMoc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZWNvcmRzID0gYm9hcmRzLmZpbmQoc2VsZWN0b3IpLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYm9hcmRzLmZpbmQoc2VsZWN0b3IpLmZldGNoKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgbG9hZExldmVsc0J5Qm9hcmRJZChpZCkge1xuICAgIGNvbnN0IHJlY29yZHMgPSBsZXZlbHMuZmluZCh7IGJvYXJkOiBpZCB9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGxldmVscy5maW5kKHsgYm9hcmQ6IGlkIH0pLmZldGNoKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgbG9hZFN1YmplY3RzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IHN1YmplY3RzLmZpbmQoc2VsZWN0b3IpLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gc3ViamVjdHMuZmluZChzZWxlY3RvcikuZmV0Y2goKTtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICBhZGRTdWJqZWN0KHN1YmplY3QpIHtcbiAgICByZXR1cm4gc3ViamVjdHMuaW5zZXJ0KHN1YmplY3QpO1xuICB9LFxuICBhZGRCb2FyZChib2FyZCkge1xuICAgIHJldHVybiBib2FyZHMuaW5zZXJ0KGJvYXJkKTtcbiAgfSxcbiAgYWRkTGV2ZWwobGV2ZWwpIHtcbiAgICByZXR1cm4gbGV2ZWxzLmluc2VydChsZXZlbCk7XG4gIH0sXG4gIGxvYWRNb2R1bGVzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IG1vZHVsZXMuZmluZChzZWxlY3RvcikuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBtb2R1bGVzLmZpbmQoc2VsZWN0b3IpLmZldGNoKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgZ2V0QWxsQ2FyZHNCeU1vZHVsZShtb2R1bGVJZCkge1xuICAgIGNvbnN0IHJlY29yZHMgPSBtb2R1bGVzLmZpbmQoeyBfaWQ6IG1vZHVsZUlkIH0pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgbW9kdWxlRGF0YSA9IG1vZHVsZXMuZmluZE9uZSh7IF9pZDogbW9kdWxlSWQgfSk7XG4gICAgY29uc3QgZmxhdENhcmRzID0gbW9kdWxlRGF0YS5jaGFwdGVycy5yZWR1Y2UoKGFjYywgeyBfaWQ6IGNoYXB0ZXJJZCB9KSA9PiB7XG4gICAgICBjb25zdCBjaGFwdGVyRGF0YSA9IGNoYXB0ZXJzLmZpbmRPbmUoeyBfaWQ6IGNoYXB0ZXJJZCB9KTtcbiAgICAgIGNvbnN0IGNoYXB0ZXJDYXJkcyA9IGNoYXB0ZXJEYXRhLmNhcmRzLm1hcCgoeyBfaWQ6IGNhcmRJZCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjYXJkcy5maW5kT25lKHsgX2lkOiBjYXJkSWQgfSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gWy4uLmFjYywgLi4uY2hhcHRlckNhcmRzXTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIGZsYXRDYXJkcztcbiAgfSxcbiAgZ2V0TW9kdWxlQnlJZChtb2R1bGVJZCkge1xuICAgIGNvbnN0IHJlY29yZHMgPSBtb2R1bGVzLmZpbmQoeyBfaWQ6IG1vZHVsZUlkIH0pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgbW9kdWxlRGF0YSA9IG1vZHVsZXMuZmluZE9uZSh7IF9pZDogbW9kdWxlSWQgfSk7XG4gICAgY29uc3QgY2hhcHRlcnNXaXRoQ2FyZHMgPSBtb2R1bGVEYXRhLmNoYXB0ZXJzLm1hcCgoeyBfaWQ6IGNoYXB0ZXJJZCwgLi4ucmVzdCB9KSA9PiB7XG4gICAgICBjb25zdCBjaGFwdGVyRGF0YSA9IGNoYXB0ZXJzLmZpbmRPbmUoeyBfaWQ6IGNoYXB0ZXJJZCB9KTtcbiAgICAgIGNvbnN0IGNoYXB0ZXJDYXJkcyA9IGNoYXB0ZXJEYXRhLmNhcmRzLm1hcCgoeyBfaWQ6IGNhcmRJZCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjYXJkcy5maW5kT25lKHsgX2lkOiBjYXJkSWQgfSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXN0LFxuICAgICAgICAuLi5jaGFwdGVyRGF0YSxcbiAgICAgICAgY2FyZHM6IGNoYXB0ZXJDYXJkcyxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1vZHVsZURhdGEsXG4gICAgICBjaGFwdGVyczogY2hhcHRlcnNXaXRoQ2FyZHMsXG4gICAgfTtcbiAgfSxcbiAgZ2V0TW9kdWxlc0J5U3ViamVjdChzdWJqZWN0KSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IG1vZHVsZXMuZmluZCh7IHN1YmplY3QgfSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBtb2R1bGVzLmZpbmQoeyBzdWJqZWN0IH0pLmZldGNoKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgYWRkWk1vZHVsZShtb2R1bGUpIHtcbiAgICByZXR1cm4gbW9kdWxlcy5pbnNlcnQobW9kdWxlKTtcbiAgfSxcbiAgbG9hZENoYXB0ZXJzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IGNoYXB0ZXJzLmZpbmQoc2VsZWN0b3IpLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gY2hhcHRlcnMuZmluZChzZWxlY3RvciwgeyBzb3J0OiB7IGNyZWF0ZWQ6IDEgfSB9KS5mZXRjaCgpO1xuICAgIHJldHVybiByZXM7XG4gIH0sXG4gIGFkZENoYXB0ZXIoY2hhcHRlcikge1xuICAgIHJldHVybiBjaGFwdGVycy5pbnNlcnQoY2hhcHRlcik7XG4gIH0sXG4gIGFkZENhcmQoY2FyZCkge1xuICAgIHJldHVybiBjYXJkcy5pbnNlcnQoY2FyZCk7XG4gIH0sXG4gIGdldEFsbENhcmRzKCkge1xuICAgIGNvbnN0IHJlY29yZHMgPSBjYXJkcy5maW5kKHt9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGNhcmRzLmZpbmQoe30pLmZldGNoKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgbG9hZENhcmRzKGlkKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IGNhcmRzLmZpbmQoeyBfaWQ6IGlkIH0pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gY2FyZHMuZmluZCh7IF9pZDogaWQgfSkuZmV0Y2goKTtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICB1cGRhdGVDYXJkKG9iaikge1xuICAgIHJldHVybiBjYXJkcy51cGRhdGUoeyBfaWQ6IG9iai5jYXJkSWQgfSwge1xuICAgICAgJHNldDoge1xuICAgICAgICBjb250ZW50OiBvYmouY29udGVudCxcbiAgICAgICAgZGF0YV91cGRhdGVkOiBvYmouZGF0YV91cGRhdGVkLFxuICAgICAgICBzb3J0S2V5OiBvYmouc29ydEtleSxcbiAgICAgICAgdGl0bGU6IG9iai50aXRsZSxcbiAgICAgICAgYXV0aG9yOiBvYmouYXV0aG9yLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgdXBkYXRlQ2hhcHRlcihvYmopIHtcbiAgICByZXR1cm4gbW9kdWxlcy51cGRhdGUoeyBfaWQ6IG9iai5tb2R1bGVJZCB9LCB7ICRwdXNoOiB7IGNoYXB0ZXJzOiBvYmouY2hhcHRlciB9IH0pO1xuICB9LFxuICBhZGRTdWJqZWN0VG9Vc2VyKHsgdXNlcklkLCBzdWJqZWN0SWQgfSkge1xuICAgIGNvbnN0IHN1YmplY3QgPSBzdWJqZWN0cy5maW5kT25lKHsgX2lkOiBzdWJqZWN0SWQgfSk7XG4gICAgcmV0dXJuIE1ldGVvci51c2Vycy51cGRhdGUoeyBfaWQ6IHVzZXJJZCB9LCB7ICRwdXNoOiB7IHN1YmplY3RzOiBzdWJqZWN0IH0gfSk7XG4gIH0sXG4gIHVwZGF0ZUNoYXB0ZXJXaXRoQ2FyZChvYmopIHtcbiAgICByZXR1cm4gY2hhcHRlcnMudXBkYXRlKHsgX2lkOiBvYmouY2hhcHRlcklkIH0sIHsgJHB1c2g6IHsgY2FyZHM6IG9iai5jYXJkcyB9IH0pO1xuICB9LFxuICBnZXRDaGFwdGVyQnlDYXJkKGNhcmRJZCkge1xuICAgIGxldCBjaGFwdGVySWQ7XG4gICAgY29uc3QgYWxsQ2hhcHRlcnMgPSBjaGFwdGVycy5maW5kKCkuZm9yRWFjaChmdW5jdGlvbiAoY2hhcHRlcikge1xuICAgICAgY29uc3QgY2FyZCA9IGNoYXB0ZXIuY2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoY2FyZCkge1xuICAgICAgICBpZiAoY2FyZC5faWQgPT09IGNhcmRJZCkge1xuICAgICAgICAgIGNoYXB0ZXJJZCA9IGNoYXB0ZXIuX2lkXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2hhcHRlcklkO1xuXG5cbiAgfSxcbiAgZ2V0S2V5d29yZHMoKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IG1vZHVsZXMuZmluZCh7fSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBhbGxNb2R1bGVzID0gbW9kdWxlcy5maW5kKHt9LCB7IGZpZWxkczogeyBfaWQ6IDAgfSB9KS5mZXRjaCgpO1xuICAgIGNvbnN0IHJlcyA9IGFsbE1vZHVsZXMubWFwKCh7IHN1YmplY3Q6IHN1YmplY3RJZCwgbmFtZSB9KSA9PiB7XG4gICAgICBjb25zdCB7IGJvYXJkLCBsZXZlbCwgbmFtZTogc3ViamVjdE5hbWUgfSA9IHN1YmplY3RzLmZpbmRPbmUoeyBfaWQ6IHN1YmplY3RJZCB9KTtcbiAgICAgIGNvbnN0IHsgbmFtZTogbGV2ZWxOYW1lIH0gPSBsZXZlbHMuZmluZE9uZSh7IF9pZDogbGV2ZWwgfSk7XG4gICAgICBjb25zdCB7IG5hbWU6IGJvYXJkTmFtZSB9ID0gYm9hcmRzLmZpbmRPbmUoeyBfaWQ6IGJvYXJkIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbGV2ZWxOYW1lLFxuICAgICAgICBib2FyZE5hbWUsXG4gICAgICAgIHN1YmplY3ROYW1lLFxuICAgICAgICB0eXBlOiAnbW9kdWxlJyxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgZ2V0U3ViamVjdE5hbWUoaWQpIHtcbiAgICBjb25zdCByZWNvcmRzID0gc3ViamVjdHMuZmluZCh7fSwgeyBmaWVsZHM6IHsgbmFtZTogMSwgX2lkOiAwIH0gfSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBzdWJqZWN0cy5maW5kKHt9LCB7IGZpZWxkczogeyBuYW1lOiAxLCBfaWQ6IDAgfSB9KS5mZXRjaCgpO1xuICAgIHJldHVybiByZXM7XG4gIH0sXG5cbiAgZ2V0U3ViamVjdEtleXdvcmRzKG9iaikge1xuICAgIGNvbnN0IHJlY29yZHMgPSBzdWJqZWN0cy5maW5kKHt9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IGFsbFN1YmplY3RzID0gc3ViamVjdHMuZmluZCh7fSwgeyBmaWVsZHM6IHsgX2lkOiAwIH0gfSkuZmV0Y2goKTtcbiAgICBjb25zdCByZXMgPSBhbGxTdWJqZWN0cy5tYXAoKHsgbGV2ZWw6IGxldmVsSWQsIGJvYXJkOiBib2FyZElkLCBuYW1lIH0pID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZTogbGV2ZWxOYW1lIH0gPSBsZXZlbHMuZmluZE9uZSh7IF9pZDogbGV2ZWxJZCB9KTtcbiAgICAgIGNvbnN0IHsgbmFtZTogYm9hcmROYW1lIH0gPSBib2FyZHMuZmluZE9uZSh7IF9pZDogYm9hcmRJZCB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxldmVsTmFtZSxcbiAgICAgICAgYm9hcmROYW1lLFxuICAgICAgICB0eXBlOiAnc3ViamVjdCcsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0sXG4gIGdldExldmVsS2V5d29yZHMob2JqKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IGxldmVscy5maW5kKHt9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IGFsbExldmVscyA9IGxldmVscy5maW5kKHt9LCB7IGZpZWxkczogeyBfaWQ6IDAgfSB9KS5mZXRjaCgpO1xuICAgIGNvbnN0IHJlcyA9IGFsbExldmVscy5tYXAoKHsgYm9hcmQ6IGJvYXJkSWQsIG5hbWUgfSkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lOiBib2FyZE5hbWUgfSA9IGJvYXJkcy5maW5kT25lKHsgX2lkOiBib2FyZElkIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYm9hcmROYW1lLFxuICAgICAgICB0eXBlOiAnbGV2ZWwnLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICBnZXRCb2FyZEtleXdvcmRzKG9iaikge1xuICAgIGNvbnN0IHJlY29yZHMgPSBib2FyZHMuZmluZCh7fSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBhbGxCb2FyZHMgPSBib2FyZHMuZmluZCh7fSwgeyBmaWVsZHM6IHsgbmFtZTogMSwgX2lkOiAwIH0gfSkuZmV0Y2goKTtcbiAgICBjb25zdCByZXMgPSBhbGxCb2FyZHMubWFwKChib2FyZCkgPT4gKHtcbiAgICAgIC4uLmJvYXJkLFxuICAgICAgdHlwZTogJ2JvYXJkJyxcbiAgICB9KSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgZ2V0Qm9hcmRLZXl3b3JkKGlkKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IGJvYXJkcy5maW5kKHsgX2lkOiBpZCB9LCB7IGZpZWxkczogeyBuYW1lOiAxLCBfaWQ6IDAgfSB9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGJvYXJkcy5maW5kKHsgX2lkOiBpZCB9LCB7IGZpZWxkczogeyBuYW1lOiAxLCBfaWQ6IDAgfSB9KS5mZXRjaCgpO1xuICAgIHJldHVybiByZXM7XG4gIH0sXG4gIGdlbmVyaWNTZWFyY2goc2VhcmNoYWJsZSkge1xuICAgIGxldCByZWNvcmRzO1xuICAgIHJlY29yZHMgPSBtb2R1bGVzLmZpbmQoeyBuYW1lOiBzZWFyY2hhYmxlIH0sIHsgZmllbGRzOiB7IF9pZDogMSB9IH0pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgIT09IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgICAgICBpZDogbW9kdWxlcy5maW5kKHsgbmFtZTogc2VhcmNoYWJsZSB9LCB7IGZpZWxkczogeyBfaWQ6IDEgfSB9KS5mZXRjaCgpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmVjb3JkcyA9IHN1YmplY3RzLmZpbmQoeyBuYW1lOiBzZWFyY2hhYmxlIH0sIHsgZmllbGRzOiB7IF9pZDogMSB9IH0pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgIT09IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdzdWJqZWN0JyxcbiAgICAgICAgaWQ6IHN1YmplY3RzLmZpbmQoeyBuYW1lOiBzZWFyY2hhYmxlIH0sIHsgZmllbGRzOiB7IF9pZDogMSB9IH0pLmZldGNoKCksXG4gICAgICB9O1xuICAgIH1cbiAgICByZWNvcmRzID0gbGV2ZWxzLmZpbmQoeyBuYW1lOiBzZWFyY2hhYmxlIH0sIHsgZmllbGRzOiB7IF9pZDogMSB9IH0pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgIT09IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdsZXZlbCcsXG4gICAgICAgIGlkOiBsZXZlbHMuZmluZCh7IG5hbWU6IHNlYXJjaGFibGUgfSwgeyBmaWVsZHM6IHsgX2lkOiAxIH0gfSkuZmV0Y2goKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJlY29yZHMgPSBib2FyZHMuZmluZCh7IG5hbWU6IHNlYXJjaGFibGUgfSwgeyBmaWVsZHM6IHsgX2lkOiAxIH0gfSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyAhPT0gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2JvYXJkJyxcbiAgICAgICAgaWQ6IGJvYXJkcy5maW5kKHsgbmFtZTogc2VhcmNoYWJsZSB9LCB7IGZpZWxkczogeyBfaWQ6IDEgfSB9KS5mZXRjaCgpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICBnZXRCb2FyZElkQnlMZXZlbChsZXZlbElkKSB7XG4gICAgY29uc3QgcmVzID0gbGV2ZWxzLmZpbmQoeyBfaWQ6IGxldmVsSWQgfSkuZmV0Y2goKTtcbiAgICBjb25zdCBsZXZlbCA9IHJlc1swXTtcbiAgICByZXR1cm4gbGV2ZWwuYm9hcmQ7XG4gIH0sXG4gIGxvYWRTdWJqZWN0TmFtZShpZCkge1xuICAgIGNvbnN0IHJlcyA9IHN1YmplY3RzLmZpbmQoeyBfaWQ6IGlkIH0pLmZldGNoKCk7XG4gICAgY29uc3Qgc3ViamVjdCA9IHJlc1swXTtcbiAgICByZXR1cm4gc3ViamVjdC5uYW1lO1xuICB9LFxuICBnZXRTdWJqZWN0TmFtZUJ5TW9kdWxlSWQoaWQpIHtcbiAgICBjb25zdCByZXN1bHRzID0gbW9kdWxlcy5maW5kKHsgX2lkOiBpZCB9KS5mZXRjaCgpO1xuICAgIGNvbnN0IHJlcyA9IHJlc3VsdHNbMF07XG4gICAgY29uc3Qgc3ViamVjdElkID0gcmVzLnN1YmplY3Q7XG4gICAgY29uc3Qgc3ViamVjdFJlc3VsdHMgPSBzdWJqZWN0cy5maW5kKHsgX2lkOiBzdWJqZWN0SWQgfSkuZmV0Y2goKTtcbiAgICBjb25zdCBzdWJqZWN0UmVzID0gc3ViamVjdFJlc3VsdHNbMF07XG4gICAgcmV0dXJuIHN1YmplY3RSZXMubmFtZTtcbiAgfSxcbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiBjYXJkcy5yZW1vdmUoeyBfaWQ6IGlkIH0pO1xuICB9LFxuICByZW1vdmVDYXJkUmVmKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGNoYXB0ZXJzLnVwZGF0ZSh7IF9pZDogc2VsZWN0b3IuY2hhcHRlcklkIH0sIHsgJHB1bGw6IHsgY2FyZHM6IHsgX2lkOiBzZWxlY3Rvci5jYXJkSWQgfSB9IH0pO1xuICB9LFxuICBnZXRUZWFtKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIE1ldGVvci51c2Vycy5maW5kKHt9KS5mZXRjaCgpO1xuICB9LFxuICBnZXRBbGxVc2VycyhzZWxlY3Rvcikge1xuICAgIHJldHVybiBNZXRlb3IudXNlcnMuZmluZCh7fSwgeyBza2lwOiBwYXJzZUludChzZWxlY3Rvci5vZmZzZXQpLCBsaW1pdDogcGFyc2VJbnQoc2VsZWN0b3IubGltaXQpIH0sIHsgc29ydDogeyBjcmVhdGVkQXQ6IC0xIH0gfSkuZmV0Y2goKTtcbiAgfSxcbiAgZ2V0QWxsU3ViamVjdHMoKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IHN1YmplY3RzLmZpbmQoe30pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgYWxsU3ViamVjdHMgPSBzdWJqZWN0cy5maW5kKHt9KS5mZXRjaCgpO1xuICAgIGNvbnN0IHJlcyA9IGFsbFN1YmplY3RzLm1hcCgoeyBsZXZlbDogbGV2ZWxJZCwgYm9hcmQ6IGJvYXJkSWQsIC4uLnJlc3QgfSkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lOiBsZXZlbE5hbWUgfSA9IGxldmVscy5maW5kT25lKHsgX2lkOiBsZXZlbElkIH0pO1xuICAgICAgY29uc3QgeyBuYW1lOiBib2FyZE5hbWUgfSA9IGJvYXJkcy5maW5kT25lKHsgX2lkOiBib2FyZElkIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgbGV2ZWw6IGxldmVsSWQsXG4gICAgICAgIGJvYXJkOiBib2FyZElkLFxuICAgICAgICBsZXZlbE5hbWUsXG4gICAgICAgIGJvYXJkTmFtZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgZmluZFVzZXJSb2xlKGlkKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IE1ldGVvci51c2Vycy5maW5kKHsgX2lkOiBpZCB9LCB7IGZpZWxkczogeyByb2xlOiAxLCBfaWQ6IDAgfSB9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IE1ldGVvci51c2Vycy5maW5kKHsgX2lkOiBpZCB9LCB7IGZpZWxkczogeyByb2xlOiAxLCBfaWQ6IDAgfSB9KS5mZXRjaCgpO1xuICAgIHJldHVybiByZXM7XG4gIH0sXG4gIGZpbmRVc2VyU3ViamVjdHMoaWQpIHtcbiAgICBjb25zdCByZWNvcmRzID0gTWV0ZW9yLnVzZXJzLmZpbmQoeyBfaWQ6IGlkIH0sIHsgZmllbGRzOiB7IHN1YmplY3RzOiAxLCBfaWQ6IDAgfSB9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IE1ldGVvci51c2Vycy5maW5kKHsgX2lkOiBpZCB9LCB7IGZpZWxkczogeyBzdWJqZWN0czogMSwgX2lkOiAwIH0gfSkuZmV0Y2goKTtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICBnZXRVc2VyU3ViamVjdHMoaWQpIHtcbiAgICBjb25zdCByZWNvcmRzID0gTWV0ZW9yLnVzZXJzLmZpbmQoeyBfaWQ6IGlkIH0sIHsgZmllbGRzOiB7IHN1YmplY3RzOiAxLCBfaWQ6IDAgfSB9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHsgc3ViamVjdHM6IGFsbFN1YmplY3RzIH0gPSBNZXRlb3IudXNlcnMuZmluZE9uZSh7IF9pZDogaWQgfSxcbiAgICAgIHsgZmllbGRzOiB7IHN1YmplY3RzOiAxLCBfaWQ6IDAgfSB9KTtcbiAgICBjb25zdCByZXMgPSBhbGxTdWJqZWN0cy5tYXAoKHsgbGV2ZWw6IGxldmVsSWQsIGJvYXJkOiBib2FyZElkLCAuLi5yZXN0IH0pID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZTogbGV2ZWxOYW1lIH0gPSBsZXZlbHMuZmluZE9uZSh7IF9pZDogbGV2ZWxJZCB9KTtcbiAgICAgIGNvbnN0IHsgbmFtZTogYm9hcmROYW1lIH0gPSBib2FyZHMuZmluZE9uZSh7IF9pZDogYm9hcmRJZCB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnJlc3QsXG4gICAgICAgIGxldmVsOiBsZXZlbElkLFxuICAgICAgICBib2FyZDogYm9hcmRJZCxcbiAgICAgICAgbGV2ZWxOYW1lLFxuICAgICAgICBib2FyZE5hbWUsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0sXG4gIGFkZExhc3RQb3NpdGlvbihvYmopIHtcbiAgICBNZXRlb3IudXNlcnMudXBkYXRlKFxuICAgICAgeyBfaWQ6IG9iai51c2VySWQsICdsYXN0UG9zaXRpb25zLmlkJzogeyAkZXE6IG9iai5zdWJqZWN0LmlkIH0gfSxcbiAgICAgIHtcbiAgICAgICAgJHNldDoge1xuICAgICAgICAgICdsYXN0UG9zaXRpb25zLiQucG9zaXRpb24nOiBvYmouc3ViamVjdC5wb3NpdGlvbixcbiAgICAgICAgICAnbGFzdFBvc2l0aW9ucy4kLnByb2dyZXNzJzogb2JqLnN1YmplY3QucHJvZ3Jlc3MsXG4gICAgICAgICAgJ2xhc3RQb3NpdGlvbnMuJC50aW1lc3RhbXAnOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICdsYXN0UG9zaXRpb25zLiQubW9kdWxlTmFtZSc6IG9iai5zdWJqZWN0Lm1vZHVsZU5hbWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge30sIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgIT0gMSkge1xuICAgICAgICAgIE1ldGVvci51c2Vycy51cHNlcnQoeyBfaWQ6IG9iai51c2VySWQgfSwge1xuICAgICAgICAgICAgJHB1c2g6IHtcbiAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uczoge1xuICAgICAgICAgICAgICAgIGlkOiBvYmouc3ViamVjdC5pZCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogb2JqLnN1YmplY3QucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IG9iai5zdWJqZWN0LnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IG9iai5zdWJqZWN0Lm1vZHVsZU5hbWUsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHJlc3VsdC5uTWF0Y2hlZCA9PSAwIHRoZW4gbWFrZSB5b3VyICRhZGRUb1NldFxuICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIGFyZSBubyBxdWVyeVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgLy8gcmV0dXJuIE1ldGVvci51c2Vycy51cHNlcnQoe19pZDogb2JqLnVzZXJJZH0sIHskcHVzaDoge2xhc3RQb3NpdGlvbnM6IHtpZDogb2JqLnN1YmplY3QuaWQsIHBvc2l0aW9uOiBvYmouc3ViamVjdC5wb3NpdGlvbn19fSk7XG4gIH0sXG4gIGdldFVzZXIoaWQpIHtcbiAgICBjb25zdCByZWNvcmRzID0gTWV0ZW9yLnVzZXJzLmZpbmQoeyBfaWQ6IGlkIH0sXG4gICAgICB7IGZpZWxkczogeyBsYXN0UG9zaXRpb25zOiAxLCBfaWQ6IDAgfSB9LFxuICAgICAgeyBzb3J0OiB7IHRpbWVzdGFtcDogMSB9IH0pLmNvdW50KCk7XG4gICAgaWYgKHJlY29yZHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gTWV0ZW9yLnVzZXJzLmZpbmQoeyBfaWQ6IGlkIH0sIHsgZmllbGRzOiB7IGxhc3RQb3NpdGlvbnM6IDEsIF9pZDogMCB9IH0pLmZldGNoKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgZ2V0U3ViamVjdEJ5SWQoaWQpIHtcbiAgICBjb25zdCByZWNvcmRzID0gc3ViamVjdHMuZmluZCh7IF9pZDogaWQgfSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCB7IGxldmVsOiBsZXZlbElkLCBib2FyZDogYm9hcmRJZCwgLi4ucmVzdCB9ID0gc3ViamVjdHMuZmluZE9uZSh7IF9pZDogaWQgfSk7XG4gICAgY29uc3QgeyBuYW1lOiBsZXZlbE5hbWUgfSA9IGxldmVscy5maW5kT25lKHsgX2lkOiBsZXZlbElkIH0pO1xuICAgIGNvbnN0IHsgbmFtZTogYm9hcmROYW1lIH0gPSBib2FyZHMuZmluZE9uZSh7IF9pZDogYm9hcmRJZCB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzdCxcbiAgICAgIGxldmVsOiBsZXZlbElkLFxuICAgICAgYm9hcmQ6IGJvYXJkSWQsXG4gICAgICBsZXZlbE5hbWUsXG4gICAgICBib2FyZE5hbWUsXG4gICAgfTtcbiAgfSxcbiAgYWRkU3BvbnNvckNvbnRlbnQoY2FyZCkge1xuICAgIGNvbnN0IHJlY29yZHMgPSBzcG9uc29yQ2FyZHMuZmluZCh7IHNwb25zb3I6IGNhcmQuc3BvbnNvciB9KS5jb3VudCgpO1xuICAgIGlmIChyZWNvcmRzID09PSAwKSB7XG4gICAgICByZXR1cm4gc3BvbnNvckNhcmRzLmluc2VydChjYXJkKTtcbiAgICB9XG4gICAgaWYgKGNhcmQuaXNOZXcpIHtcbiAgICAgIGRlbGV0ZSBjYXJkLmlzTmV3O1xuICAgICAgdXBkYXRlU3BvbnNvckNvbnRlbnQoY2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBjYXJkLmlzTmV3O1xuICAgICAgdXBkYXRlU3BvbnNvckNvbnRlbnRXaXRob3V0Q29udGVudChjYXJkKTtcbiAgICB9XG4gIH0sXG4gIGdldFNwb25zb3JDYXJkKGlkKSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IHNwb25zb3JDYXJkcy5maW5kKHsgc3BvbnNvcjogaWQgfSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBzcG9uc29yQ2FyZHMuZmluZCh7IHNwb25zb3I6IGlkIH0pLmZldGNoKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgZ2V0QWxsU3BvbnNvckNhcmRzKG9iaikge1xuICAgIGNvbnN0IHJlY29yZHMgPSBzcG9uc29yQ2FyZHMuZmluZCh7fSkuY291bnQoKTtcbiAgICBpZiAocmVjb3JkcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBzcG9uc29yQ2FyZHMuZmluZCh7fSkuZmV0Y2goKTtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuXG59KTtcblxuZnVuY3Rpb24gdXBkYXRlU3BvbnNvckNvbnRlbnQoY2FyZCkge1xuICBzcG9uc29yQ2FyZHMudXBkYXRlKHsgc3BvbnNvcjogY2FyZC5zcG9uc29yIH0sIHtcbiAgICAkcHVzaDoge1xuICAgICAgY29udGVudDogY2FyZC5jb250ZW50WzBdLFxuICAgIH0sXG4gIH0sIHt9LCAoZXJyLCByZXNwKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3BvbnNvckNhcmRzLnVwZGF0ZSh7IHNwb25zb3I6IGNhcmQuc3BvbnNvciB9LCB7XG4gICAgICAgICRzZXQ6IHtcbiAgICAgICAgICBsb2dvOiBjYXJkLmxvZ28sXG4gICAgICAgICAgc3ViamVjdHM6IGNhcmQuc3ViamVjdHMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlU3BvbnNvckNvbnRlbnRXaXRob3V0Q29udGVudChjYXJkKSB7XG4gIHJldHVybiBzcG9uc29yQ2FyZHMudXBkYXRlKHsgc3BvbnNvcjogY2FyZC5zcG9uc29yIH0sIHtcbiAgICAkc2V0OiB7XG4gICAgICBsb2dvOiBjYXJkLmxvZ28sXG4gICAgICBzdWJqZWN0czogY2FyZC5zdWJqZWN0cyxcbiAgICB9LFxuICB9KTtcbn1cblxuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuXG59KTtcbiJdfQ==
