const express = require('express');
const router = express.Router();
const library = require("../controller/libraryController");


const prefixLibrary = "/api/library";

router.post(prefixLibrary + "/borrow", library.borrowBook);
router.post(prefixLibrary + "/return", library.returnBook);
router.get(prefixLibrary + "/books", library.getAllBooks);
router.get(prefixLibrary + "/members", library.getAllMembers);

module.exports = router;