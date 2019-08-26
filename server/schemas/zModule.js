const subjectSchema = require('./subject');
const chapterSchema = require('./chapter');

moduleSchema = new SimpleSchema({
    subject: {
        type: subjectSchema,
        label: "subject"
    },
    name: {
        type: String,
        label: "name"
    },
    chapters:{type: Array},
    "chapters.$": {type: chapterSchema}



});

module.exports = moduleSchema;