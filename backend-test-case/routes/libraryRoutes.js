// routes/libraryRoutes.js

const express = require('express');
const router = express.Router();
const library = require("../controller/libraryController");

// Swagger documentation
/**
 * @openapi
 * /api/library/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags:
 *       - Library
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 example: 'M001'
 *               bookId:
 *                 type: string
 *                 example: 'JK-45'
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post('/borrow', library.borrowBook);

/**
 * @openapi
 * /api/library/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags:
 *       - Library
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 example: 'M001'
 *               bookId:
 *                 type: string
 *                 example: 'JK-45'
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post('/return', library.returnBook);

/**
 * @openapi
 * /api/library/books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Library
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: 'JK-45'
 *                       title:
 *                         type: string
 *                         example: 'Harry Potter'
 *                       author:
 *                         type: string
 *                         example: 'J.K Rowling'
 *                       stock:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal server error
 */
router.get('/books', library.getAllBooks);

/**
 * @openapi
 * /api/library/members:
 *   get:
 *     summary: Get all members
 *     tags:
 *       - Library
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: 'M001'
 *                       name:
 *                         type: string
 *                         example: 'Angga'
 *       500:
 *         description: Internal server error
 */
router.get('/members', library.getAllMembers);

module.exports = router;
