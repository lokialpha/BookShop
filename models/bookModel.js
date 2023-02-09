const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema ({
    name : {
        type : String,
        require : true,
        unique : true,
    },

    description : {
        type : String,
        require : true,
    },

    author : {
        type: Schema.Types.ObjectId,
        ref : "Author",
        require : true,
    },
},{ timestamps : true });

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;