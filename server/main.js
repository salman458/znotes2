import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Accounts } from "meteor/accounts-base";

import boardSchema from "./schemas/board.js";
import levelSchema from "./schemas/level.js";
import subjectSchema from "./schemas/subject.js";
import zModuleSchema from "./schemas/zModule.js";
import cardSchema from "./schemas/card.js";
import chapterSchema from "./schemas/chapter.js";
import sponsorCardSchema from "./schemas/sponsorCard.js";

const sponsorCards = new Mongo.Collection("sponsorCards");
sponsorCards.schema = sponsorCardSchema;

const boards = new Mongo.Collection("boards");
boards.friendlySlugs({
  slugFrom: "name",
  slugField: "slug",
  distinct: true
});
boards.schema = boardSchema;

const levels = new Mongo.Collection("levels");
levels.friendlySlugs({
  slugFrom: "name",
  slugField: "slug",
  distinct: true
});
levels.schema = levelSchema;

const subjects = new Mongo.Collection("subjects");
subjects.friendlySlugs({
  slugFrom: "name",
  slugField: "slug",
  distinct: true
});

subjects.schema = subjectSchema;

const modules = new Mongo.Collection("modules");
modules.friendlySlugs({
  slugFrom: "name",
  slugField: "slug",
  distinct: true
});
modules.schema = zModuleSchema;

const cards = new Mongo.Collection("cards");
cards.schema = cardSchema;

const chapters = new Mongo.Collection("chapters");
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

Accounts.emailTemplates.enrollAccount.subject = user =>
  `Welcome to Znotes, ${user.profile.name}`;
Accounts.emailTemplates.enrollAccount.text = (user, url) =>
  ` To activate your account, simply click the link below:\n\n${url}`;

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
    return "old email was successfully removed";
  },
  addEmail(obj) {
    Accounts.addEmail(obj.user._id, obj.email);
  },
  sendVerification(user) {
    Meteor.users.update(
      { _id: user._id },
      { $pop: { "services.email.verificationTokens": -1 } }
    );
    Accounts.sendVerificationEmail(user._id);
  },
  verify(token) {
    Accounts.verifyEmail(token, error => {
      if (error) console.log("Failed to verify the email");
      else console.log("The email is verified");
    });
  },
  extendProfile(obj) {
    return Meteor.users.update({ _id: obj.userId }, { $set: obj.fields });
  },
  addUser(user) {
    Accounts.createUser(user);
  },

  loadAllData(boardId) {
    let allBoards;
    if (boardId && typeof boardId === "string") {
      const records = boards.find({ _id: boardId }).count();
      if (records === 0) {
        return [];
      }
      allBoards = boards.find({ _id: boardId }).fetch();
    } else {
      const records = boards.find({}).count();
      if (records === 0) {
        return [];
      }
      allBoards = boards.find({}).fetch();
    }

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
    const result = allBoards.map(
      ({ _id: boardId, name: boardName, ...rest }) => {
        const allLevels = levels.find({ board: boardId }).fetch();
        const allLevelsWithSubjects = allLevels.map(
          ({ _id: levelId, name: levelName, ...levelRest }) => {
            const allSubjects = subjects.find({ level: levelId }).fetch();
            const allSubjectsWithNames = allSubjects.map(subjectData => ({
              ...subjectData,
              boardName,
              levelName
            }));
            return {
              ...levelRest,
              levelId,
              name: levelName,
              board: boardName,
              subjects: allSubjectsWithNames
            };
          }
        );
        return {
          ...rest,
          boardId,
          name: boardName,
          levels: allLevelsWithSubjects
        };
      }
    );
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
  getAllCardsByModule(moduleId) {
    const records = modules.find({ _id: moduleId }).count();
    if (records === 0) {
      return [];
    }
    const moduleData = modules.findOne({ _id: moduleId });
    const flatCards = moduleData.chapters.reduce((acc, { _id: chapterId }) => {
      const chapterData = chapters.findOne({ _id: chapterId });
      const chapterCards = chapterData.cards.map(({ _id: cardId }) => {
        const data = cards.findOne({ _id: cardId });
        return data;
      });
      return [...acc, ...chapterCards];
    }, []);
    return flatCards;
  },
  getAllCardsByModuleSlugName(slug) {
    const records = modules
      .find({
        $or: [
          {
            _id: slug
          },
          {
            slug
          }
        ]
      })
      .count();
    if (records === 0) {
      return [];
    }
    const moduleData = modules.findOne({
      $or: [
        {
          _id: slug
        },
        {
          slug
        }
      ]
    });
    const flatCards = moduleData.chapters.reduce((acc, { _id: chapterId }) => {
      const chapterData = chapters.findOne({ _id: chapterId });
      const chapterCards = chapterData.cards
        .map(({ _id: cardId }) => {
          const data = cards.findOne({ _id: cardId });
          return data;
        })
        .filter(v => v != null);
      return [...acc, ...chapterCards];
    }, []);
    return flatCards;
  },

  getChaptersByModuleSlugName(slug) {
    const records = modules
      .find({
        $or: [
          {
            _id: slug
          },
          {
            slug
          }
        ]
      })
      .count();
    if (records === 0) {
      return [];
    }
    const moduleData = modules.findOne({
      $or: [
        {
          _id: slug
        },
        {
          slug
        }
      ]
    });
    const chaptersWithCards = moduleData.chapters.map(
      ({ _id: chapterId, ...rest }) => {
        const chapterData = chapters.findOne({ _id: chapterId });
        const chapterCards = chapterData.cards.map(({ _id: cardId }) => {
          const data = cards.findOne({ _id: cardId });
          return data;
        }).filter(v => v != null);
        return {
          ...rest,
          ...chapterData,
          cards: chapterCards
        };
      }
    );
    return {
      ...moduleData,
      chapters: chaptersWithCards
    };
  },
  getModuleById(moduleId) {
    const records = modules.find({ _id: moduleId }).count();
    if (records === 0) {
      return [];
    }
    const moduleData = modules.findOne({ _id: moduleId });
    const chaptersWithCards = moduleData.chapters.map(
      ({ _id: chapterId, ...rest }) => {
        const chapterData = chapters.findOne({ _id: chapterId });
        const chapterCards = chapterData.cards.map(({ _id: cardId }) => {
          const data = cards.findOne({ _id: cardId });
          return data;
        });
        return {
          ...rest,
          ...chapterData,
          cards: chapterCards
        };
      }
    );
    return {
      ...moduleData,
      chapters: chaptersWithCards
    };
  },
  // getModulesBySubject(subject) {
  //   const records = modules.find({ subject }).count();
  //   if (records === 0) {
  //     return [];
  //   }
  //   let res = modules.find({ subject }).fetch();
  //   let cardData;
  //   if (res) {
  //     res = res.map((e, i) => {
  //       if (e.chapters) {
  //         const chaptersWithCards = e.chapters.map((v, i) => {
  //           const cardRecords = chapters
  //             .find({ _id: v._id }, { fields: { cards: 1, _id: 0 } })
  //             .count();
  //           if (cardRecords === 0) {
  //             return { ...v };
  //           }
  //           cardData = chapters
  //             .find({ _id: v._id }, { fields: { cards: 1, _id: 0 } })
  //             .fetch();
  //           return {
  //             ...v,
  //             cards: cardData[0].cards,
  //           };
  //         });

  //         return {
  //           ...e,
  //           chapters: chaptersWithCards,
  //         };
  //       } return e;
  //     });
  //   }

  //   return res;
  // },
  getModulesBySubject(subject) {
    const records = modules
      .find({ subject }, { fields: { _id: 1, name: 1, subject: 1 } })
      .count();
    if (records === 0) {
      return [];
    }
    const res = modules.find({ subject }).fetch();
    return res;
  },

  getModuleBySubjectNameSlug(slug) {
    const subjectId = subjects
      .find(
        {
          $or: [
            {
              _id: slug
            },
            {
              slug
            }
          ]
        },
        { fields: { _id: 1 } }
      )
      .count();
    if (subjectId) {
      const records = modules.find({ subject: subjectId }).count();
      if (records === 0) {
        return [];
      }
      const res = modules.find({ subject: subjectId }).fetch();
      return res;
    }
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
    return cards.update(
      { _id: obj.cardId },
      {
        $set: {
          content: obj.content,
          data_updated: obj.data_updated,
          sortKey: obj.sortKey,
          title: obj.title,
          author: obj.author
        }
      }
    );
  },

  updateChapter(chapter) {
    return chapters.update(
      { _id: chapter._id },
      {
        $set: { name: chapter.name, updated: new Date() }
      }
    );
  },
  updateChapterInModules(obj) {
    const records = modules.findOne({
      $or: [
        {
          _id: obj.slug
        },
        {
          slug: obj.slug
        }
      ],
      "chapters._id": obj.chapter._id
    });
    if (records) {
      return modules.update(
        { "chapters._id": obj.chapter._id },
        {
          $set: {
            "chapters.$.name": obj.chapter.name,
            "chapter.$.updated": new Date()
          }
        }
      );
    } else {
      return modules.update(
        {
          $or: [
            {
              _id: obj.slug
            },
            {
              slug: obj.slug
            }
          ]
        },
        { $push: { chapters: obj.chapter } }
      );
    }
  },
  addSubjectToUser({ userId, subjectId }) {
    const subject = subjects.findOne({ _id: subjectId });
    return Meteor.users.update(
      { _id: userId },
      { $push: { subjects: subject } }
    );
  },
  updateChapterWithCard(obj) {
    return chapters.update(
      { _id: obj.chapterId },
      { $push: { cards: obj.cards } }
    );
  },

  updateModuleWithCard(obj) {
    return modules.update(
      { _id: obj.moduleId, "chapters._id": obj.chapterId },
      { $push: { "chapters.$.cards": obj.cards } }
    );
  },
  getChapterByCard(cardId) {
    let chapterId;
    const allChapters = chapters.find().forEach(function(chapter) {
      const card = chapter.cards.forEach(function(card) {
        if (card._id === cardId) {
          chapterId = chapter._id;
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
    const allModules = modules.find({}, { fields: { _id: 0 } }).fetch();
    const res = allModules.map(
      ({ subject: subjectId, name, board: boardId }) => {
        const subjectData = subjects.findOne({
          _id: subjectId
        });
        if (subjectData) {
          const { board, level, name: subjectName } = subjectData;
          const { name: levelName } = levels.findOne({ _id: level });
          const { name: boardName } = boards.findOne({ _id: board });
          return {
            name,
            levelName,
            boardName,
            subjectName,
            boardId: board,
            type: "module"
          };
        }
      }
    );
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
    const records = subjects.find({}).count();
    if (records === 0) {
      return [];
    }
    const allSubjects = subjects.find({}, { fields: { _id: 0 } }).fetch();
    const res = allSubjects.map(({ level: levelId, board: boardId, name }) => {
      const { name: levelName } = levels.findOne({ _id: levelId });
      const { name: boardName } = boards.findOne({ _id: boardId });
      return {
        name,
        levelName,
        boardName,
        boardId,
        type: "subject"
      };
    });
    return res;
  },
  getLevelKeywords(obj) {
    const records = levels.find({}).count();
    if (records === 0) {
      return [];
    }
    const allLevels = levels.find({}, { fields: { _id: 0 } }).fetch();
    const res = allLevels.map(({ board: boardId, name }) => {
      const { name: boardName } = boards.findOne({ _id: boardId });
      return {
        name,
        boardName,
        boardId,
        type: "level"
      };
    });
    return res;
  },
  getBoardKeywords(obj) {
    const records = boards.find({}).count();
    if (records === 0) {
      return [];
    }
    const allBoards = boards.find({}, { fields: { name: 1, _id: 1 } }).fetch();
    const res = allBoards.map(board => ({
      boardId: board._id,
      ...board,
      type: "board"
    }));
    return res;
  },
  getBoardKeyword(id) {
    const records = boards
      .find({ _id: id }, { fields: { name: 1, _id: 0 } })
      .count();
    if (records === 0) {
      return [];
    }
    const res = boards
      .find({ _id: id }, { fields: { name: 1, _id: 0 } })
      .fetch();
    return res;
  },

  genericSearch(searchObj) {
    const { name: searchable, boardName, type, boardId } = searchObj;

    let records;

    records = boards.find({ _id: boardId }, { fields: { _id: 1 } }).count();
    if (records !== 0) {
      return {
        type: "board",
        id: boards.find({ _id: boardId }, { fields: { _id: 1 } }).fetch()
      };
    }
    return [];

    // let records;
    // records = modules
    //   .find({ name: searchable }, { fields: { _id: 1 } })
    //   .count();
    // if (records !== 0) {
    //   console.log( "module");
    // return {
    //   type: "module",
    //   id: modules.find({ name: searchable }, { fields: { _id: 1 } }).fetch()
    // };
    // }
    // records = subjects
    //   .find({ name: searchable }, { fields: { _id: 1 } })
    //   .count();
    // if (records !== 0) {
    //   console.log( "subject");

    //   return {
    //     type: "subject",
    //     id: subjects.find({ name: searchable }, { fields: { _id: 1 } }).fetch()
    //   };
    // }
    // records = levels.find({ name: searchable }, { fields: { _id: 1 } }).count();
    // if (records !== 0) {
    //   console.log( "level");

    //   return {
    //     type: "level",
    //     id: levels.find({ name: searchable }, { fields: { _id: 1 } }).fetch()
    //   };
    // }
    // records = boards.find({ name: searchable }, { fields: { _id: 1 } }).count();
    // if (records !== 0) {
    //   console.log( "board");

    //   return {
    //     type: "board",
    //     id: boards.find({ name: searchable }, { fields: { _id: 1 } }).fetch()
    //   };
    // }
    // return [];
  },

  getSubjectSlugName(id) {
    const res = subjects.find({ _id: id }).fetch();
    const subject = res[0];
    return subject.slug;
  },

  getModuleSlugName(id) {
    const res = modules.find({ _id: id }).fetch();
    const module = res[0];
    return module.slug;
  },
  getLevelSlugName(id) {
    const res = levels.find({ _id: id }).fetch();
    const level = res[0];
    return level.slug;
  },
  getBoardSlugName(id) {
    const res = boards.find({ _id: id }).fetch();
    const board = res[0];
    return board.slug;
  },

  getSubjectNameBySlug(slug) {
    const res = subjects
      .find({
        $or: [
          {
            _id: slug
          },
          {
            slug
          }
        ]
      })
      .fetch();
    const subject = res[0];
    return subject.name;
  },

  getBoardIdByLevel(levelId) {
    const res = levels.find({ _id: levelId }).fetch();
    const level = res[0];
    return level.board;
  },
  getSubjectIdBySlug(slug) {
    const res = subjects
      .find({
        $or: [
          {
            _id: slug
          },
          {
            slug
          }
        ]
      })
      .fetch();
    const subject = res[0];
    return subject._id;
  },
  getModuleIdBySlug(slug) {
    const res = modules
      .find({
        $or: [
          {
            _id: slug
          },
          {
            slug
          }
        ]
      })
      .fetch();
    const module = res[0];
    return module._id;
  },
  loadSubjectName(subjectId) {
    const res = subjects.find({ _id: subjectId }).fetch();
    const subject = res[0];
    return subject.board;
  },
  getBoardIdBySubject(id) {
    const res = subjects.find({ _id: id }).fetch();
    const subject = res[0];
    return subject.board;
  },
  getBoardIdBySlugName(slug) {
    const res = boards
      .find({
        $or: [
          {
            _id: slug
          },
          {
            slug
          }
        ]
      })
      .fetch();
    const board = res[0];
    return board._id;
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
  deleteChapter(id) {
    return chapters.remove({ _id: id });
  },
  removeChapterRef(chapter) {
    return modules.update(
      { "chapters._id": chapter._id },
      { $pull: { chapters: { _id: chapter._id } } }
    );
  },
  removeCardRef(selector) {
    return chapters.update(
      { _id: selector.chapterId },
      { $pull: { cards: { _id: selector.cardId } } }
    );
  },
  getTeam(selector) {
    return Meteor.users.find({}).fetch();
  },
  getAllUsers(selector) {
    return Meteor.users
      .find(
        {},
        { skip: parseInt(selector.offset), limit: parseInt(selector.limit) },
        { sort: { createdAt: -1 } }
      )
      .fetch();
  },
  getAllSubjects() {
    const records = subjects.find({}).count();
    if (records === 0) {
      return [];
    }
    const allSubjects = subjects.find({}).fetch();
    const res = allSubjects.map(
      ({ level: levelId, board: boardId, ...rest }) => {
        const { name: levelName } = levels.findOne({ _id: levelId });
        const { name: boardName } = boards.findOne({ _id: boardId });
        return {
          ...rest,
          level: levelId,
          board: boardId,
          levelName,
          boardName
        };
      }
    );
    return res;
  },
  findUserRole(id) {
    const records = Meteor.users
      .find({ _id: id }, { fields: { role: 1, _id: 0 } })
      .count();
    if (records === 0) {
      return [];
    }
    const res = Meteor.users
      .find({ _id: id }, { fields: { role: 1, _id: 0 } })
      .fetch();
    return res;
  },
  findUserSubjects(id) {
    const records = Meteor.users
      .find({ _id: id }, { fields: { subjects: 1, _id: 0 } })
      .count();
    if (records === 0) {
      return [];
    }
    const res = Meteor.users
      .find({ _id: id }, { fields: { subjects: 1, _id: 0 } })
      .fetch();
    return res;
  },
  getUserSubjects(id) {
    const records = Meteor.users
      .find({ _id: id }, { fields: { subjects: 1, _id: 0 } })
      .count();
    if (records === 0) {
      return [];
    }
    const { subjects: allSubjects } = Meteor.users.findOne(
      { _id: id },
      { fields: { subjects: 1, _id: 0 } }
    );
    const res = allSubjects.map(
      ({ level: levelId, board: boardId, ...rest }) => {
        const { name: levelName } = levels.findOne({ _id: levelId });
        const { name: boardName } = boards.findOne({ _id: boardId });
        return {
          ...rest,
          level: levelId,
          board: boardId,
          levelName,
          boardName
        };
      }
    );
    return res;
  },
  addLastPosition(obj) {
    Meteor.users.update(
      { _id: obj.userId, "lastPositions.id": { $eq: obj.subject.id } },
      {
        $set: {
          "lastPositions.$.position": obj.subject.position,
          "lastPositions.$.progress": obj.subject.progress,
          "lastPositions.$.timestamp": new Date(),
          "lastPositions.$.moduleName": obj.subject.moduleName
        }
      },
      {},
      function(err, result) {
        if (err) {
          console.log(err);
        } else if (result != 1) {
          Meteor.users.upsert(
            { _id: obj.userId },
            {
              $push: {
                lastPositions: {
                  id: obj.subject.id,
                  position: obj.subject.position,
                  progress: obj.subject.progress,
                  moduleName: obj.subject.moduleName,
                  timestamp: new Date()
                }
              }
            }
          );
        }

        // if result.nMatched == 0 then make your $addToSet
        // because there are no query
      }
    );

    // return Meteor.users.upsert({_id: obj.userId}, {$push: {lastPositions: {id: obj.subject.id, position: obj.subject.position}}});
  },
  getUser(id) {
    const records = Meteor.users
      .find(
        { _id: id },
        { fields: { lastPositions: 1, _id: 0 } },
        { sort: { timestamp: 1 } }
      )
      .count();
    if (records === 0) {
      return [];
    }
    const res = Meteor.users
      .find({ _id: id }, { fields: { lastPositions: 1, _id: 0 } })
      .fetch();
    return res;
  },
  getSubjectById(id) {
    const records = subjects.find({ _id: id }).count();
    if (records === 0) {
      return [];
    }
    const { level: levelId, board: boardId, ...rest } = subjects.findOne({
      _id: id
    });
    const { name: levelName } = levels.findOne({ _id: levelId });
    const { name: boardName } = boards.findOne({ _id: boardId });
    return {
      ...rest,
      level: levelId,
      board: boardId,
      levelName,
      boardName
    };
  },

  getSubjectBySlug(slug) {
    const records = subjects
      .find({
        $or: [
          {
            _id: slug
          },
          {
            slug
          }
        ]
      })
      .count();
    if (records === 0) {
      return [];
    }
    const { level: levelId, board: boardId, ...rest } = subjects.findOne({
      $or: [
        {
          _id: slug
        },
        {
          slug
        }
      ]
    });
    const { name: levelName } = levels.findOne({ _id: levelId });
    const { name: boardName } = boards.findOne({ _id: boardId });
    return {
      ...rest,
      level: levelId,
      board: boardId,
      levelName,
      boardName
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
  }
});

function updateSponsorContent(card) {
  sponsorCards.update(
    { sponsor: card.sponsor },
    {
      $push: {
        content: card.content[0]
      }
    },
    {},
    (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        sponsorCards.update(
          { sponsor: card.sponsor },
          {
            $set: {
              logo: card.logo,
              subjects: card.subjects
            }
          }
        );
      }
    }
  );
}
function updateSponsorContentWithoutContent(card) {
  return sponsorCards.update(
    { sponsor: card.sponsor },
    {
      $set: {
        logo: card.logo,
        subjects: card.subjects
      }
    }
  );
}

Meteor.startup(() => {
  process.env.MAIL_URL =
    "smtp://team@znotes.org:1@Brooklands@smtp.gmail.com:587";
});
