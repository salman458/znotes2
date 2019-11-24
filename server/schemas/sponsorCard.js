schema = new SimpleSchema({
  title: {
    type: String,
    label: 'title',
  },
  sponsor: {
    type: String,
    label: 'sponsor',
  },
  logo: {
    type: String,
    label: 'logo',
  },
  content: {
    type: [Object],
    label: 'content',
  },
  created: {
    type: Date,
    label: 'created',
  },
  subjects: {
    type: [Object],
    label: 'subjects',
  },
});

module.exports = schema;
