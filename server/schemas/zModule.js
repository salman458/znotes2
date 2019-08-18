const subjectSchema = require('./subject');
const cardSchema = require('./card');

moduleSchema = new SimpleSchema({
    subject: {
        type: subjectSchema,
        label: "subject"
    },
    name: {
        type: String,
        label: "name"
    },
    chapters: {
        type: [
            new SimpleSchema({
                chapter: {
                    type: String,
                    label: "chapter_name"
                },
                cards: {type: Array},
                "cards.$": {type: cardSchema}

            })
        ]
    }


});

module.exports = moduleSchema;