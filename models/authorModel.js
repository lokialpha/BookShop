const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name : {
        type : String,
        required : true,
    },

    about : {
        type : String,
        required : true,
    },

    books : [
        {
            type : Schema.Types.ObjectId,
            ref : "Book"
        },
    ]
},{ timestamps : true });

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;