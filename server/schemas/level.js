const boardSchema = require('./board');

levelSchema = new SimpleSchema({
    board: {
        type: boardSchema,
        label: "board"
    },
    name: {
        type: String,
        label: "name"
    }
});

module.exports = levelSchema;