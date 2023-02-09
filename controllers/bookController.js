const Author = require("../models/authorModel");
const Book = require("../models/bookModel")

const getAllBooks = async(req,res)=>{
    try {
        const books = await Book.find().populate("author");

        res.status(200).send(books);

    } catch (error) {
        res.status(500).send(error);
    }
}

const getSingleBook = async(req, res)=>{

    const {id} = req.params;


    try {
        const book = await Book.findById(id).populate("author");

        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
}

const createBook = async(req, res)=>{
    const {name, description, authorId} = req.body;

    try {
        // book create
        const book = new Book({
            name,
            description,
            author : authorId,
        })

        // save book
        await book.save().populate;

        // find author with authorId from req.body
        const author = await Author.findById(authorId);

        // book._id >> push >> books from author
        author.books.push(book._id);

        // save author with book id
        await author.save();

        await book.populate("author")

        // show with .send
        res.status(201).send(book);

    } catch (error) {
        res.status(500).send(error);
    }
}

const updateBook = async(req, res)=>{
    const {id} = req.params;
    const {name, description, authorId} = req.body;
    try {
        // delete prevBook in the prevAuthor
        const prevBook = await Book.findById(id);

        const prevAuthor = await Author.findById(prevBook.author); //look bookmodel

        const prevBookIndex = prevAuthor.books.indexOf(id); //find array number of book

        prevAuthor.books.splice(prevBookIndex, 1); //delete book

        await prevAuthor.save();


        // update newBook in the new Author
        const newBook = await Book.findByIdAndUpdate(id, {name, description, author : authorId},{new:true});

        const newAuthor = await Author.findById(authorId);

        newAuthor.books.push(newBook._id);

        await newAuthor.save();


        await newBook.populate("author")

        //send final newbook 
        res.status(200).send(newBook);
        
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteBook = async(req,res)=>{
    const {id} = req.params;
    try {
        // delete book
        const deletedBook = await Book.findByIdAndDelete(id);


        // delete book in author
        const author = await Author.findById(deletedBook.author); //look bookmodel

        const deletedBookIndex = author.books.indexOf(id); //find array number of book

        author.books.splice(deletedBookIndex, 1); //delete book

        await author.save();


        await deletedBook.populate("author");

        res.status(200).send(deletedBook);

    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = { getAllBooks , getSingleBook , createBook , updateBook , deleteBook }