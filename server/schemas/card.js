cardSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'title',
  },
  content: {
    type: String,
    label: 'content',
  },
  created: {
    type: Date,
    label: 'data_created',
  },
  updated: {
    type: Date,
    label: 'data_updated',
  },
  author: {
    type: Meteor.users.schema,
    label: 'author',
  },
  sortKey: {
    type: Number,
    label: 'sortKey',
  },
});

module.exports = cardSchema;
