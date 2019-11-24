const cardSchema = require('./card');

chapterSchema = new SimpleSchema({
  chapter: {
    type: String,
    label: 'name',
  },
  created: {
    type: Date,
    label: 'created',
  },
  sortKey: {
    type: Number,
    label: 'sortKey',
  },
  cards: { type: Array },
  'cards.$': { type: cardSchema },
});
module.exports = chapterSchema;
