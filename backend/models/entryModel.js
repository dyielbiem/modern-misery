const mongoose = require("mongoose");

// Use Mongoose Schema
const mongooseSchema = mongoose.Schema;

// Create Entry Schema
const entrySchema = new mongooseSchema({
    name: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    submittedDate: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
    tags: {
        type: [String],
        default: []
    }
});

const Entry = mongoose.model("Entry", entrySchema);
module.exports = Entry;