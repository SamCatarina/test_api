const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    isAlive: {
        type: Boolean,
        required: true,
    },

});

const Person = mongoose.model("Person", PersonSchema);

module.exports = { Person }