const express = require("express");
const { getAllBooks, getSingleBook, createBook, updateBook, deleteBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", getAllBooks );

router.get("/:id" , getSingleBook);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);


module.exports = router