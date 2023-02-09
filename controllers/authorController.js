const Author = require("../models/authorModel.js");

const getAllAlthors = async (req,res) =>{
    try {
        const authors = await Author.find().populate("books");

        res.status(200).send(authors);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getSingleAuthor = async (req,res)=>{
    const {id} = req.params;

    try {
        const author = await Author.findById(id).populate("books");

        res.status(200).send(author);
    } catch (error) {
        res.status(500).send(error);
    }
}

const createAuthor = async(req, res)=>{
    const {name , about} = req.body;

    try {
        const author = new Author({
            name,
            about,
        });

        await author.save();
        res.status(200).send(author);

    } catch (error) {
        res.status(500).send(error);
    }
}

const updateAuthor = async(req, res)=>{
    const {id} = req.params;

    try {
        const author = await Author.findByIdAndUpdate(id, req.body , {new : true}).populate("books");
        res.status(200).send(author)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteAuthor = async(req, res)=>{
    const {id} = req.params

    try {
        const author = await Author.findByIdAndDelete(id).populate("books");
        res.status(200).send(author)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { getAllAlthors , getSingleAuthor , createAuthor , updateAuthor ,deleteAuthor };