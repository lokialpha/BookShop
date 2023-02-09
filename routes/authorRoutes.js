const express = require("express");
const { getAllAlthors, getSingleAuthor, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authorController");

const router = express.Router();

router.get("/", getAllAlthors);

router.get("/:id", getSingleAuthor);

router.post("/", createAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

module.exports = router;