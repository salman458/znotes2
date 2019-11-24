const boardSchema = require('./board');
const levelSchema = require('./level');

subjectSchema = new SimpleSchema({
  board: {
    type: boardSchema,
    label: 'board',
  },
  level: {
    type: levelSchema,
    label: 'level',
  },
  name: {
    type: String,
    label: 'name',
  },
  color: {
    type: String,
    label: 'color',
  },
});

module.exports = subjectSchema;
