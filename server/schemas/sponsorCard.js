cardSchema = new SimpleSchema({
    title: {
        type: String,
        label: "title"
    },
    sponsor:{
        type: String,
        label: "sponsorId"
    },
    logo: {
        type: String,
        label: "logo"
    },
    content: {
        type: Array,
        label: "content"
    },
    created: {
        type: Date,
        label: "data_created"
    },
    subjects: {
        type: Array,
        label: "visibleIn"
    }
});

module.exports = cardSchema;