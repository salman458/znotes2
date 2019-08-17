const cardSchema = require('./card');
noteSchema = new SimpleSchema({
    board: {
        type: new SimpleSchema({
            name: {
                type: String,
                label: "board_name"
            }
        }),
        label: "board"
    },
    subject: {
        type: new SimpleSchema({
            name: {
                type: String,
                label: "subject_name"
            }
        }),
        label: "subject"
    },
    level: {
        type: new SimpleSchema({
            name: {
                type: String,
                label: "level_name"
            }
        }),
        label: "level"
    },
    module: {
        type: String,
        label: "module_name"
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

module.exports = noteSchema;