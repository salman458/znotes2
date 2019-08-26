const cardSchema = require('./card');

chapterSchema = new SimpleSchema({
    chapter: {
        type: String,
        label: "name"
    },
    cards: {type: Array},
    "cards.$": {type: cardSchema}
});
module.exports = chapterSchema;