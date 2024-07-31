const LibraryService = require('../services/libraryService');

const borrowBook = async (req, res) => {
    const { memberId, bookId } = req.body;

    try {
        const member = await LibraryService.getMemberById(memberId);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        const book = await LibraryService.getBookById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const borrowedBooksResponse = await LibraryService.getBorrowedBooksByMemberId(memberId);
        const borrowedBooks = borrowedBooksResponse.data;
        if (borrowedBooks.length >= 2) {
            return res.status(400).json({ message: 'Member cannot borrow more than 2 books' });
        }
        if (book.code === 404) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const [bookData] = book.data;
        if (bookData.isBorrowed) {
            return res.status(400).json({ message: 'Book is already borrowed by another member' });
        }


        const penalty = await LibraryService.getMemberPenaltyStatus(memberId);
        if (penalty && new Date(penalty.penaltyEndDate) > new Date()) return res.status(400).json({ message: 'Member is under penalty and cannot borrow books' });

        await LibraryService.updateBookStatus(bookId, 1);
        await LibraryService.insertBorrowedBook(memberId, bookId);

        res.json({ message: 'Book borrowed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handle kembalikan buku
const returnBook = async (req, res) => {
    const { memberId, bookId } = req.body;

    try {
        const borrowedBooks = await LibraryService.getBorrowedBooksByMemberId(memberId);
        if (borrowedBooks.code === 404) {
            return res.status(400).json({ message: 'Book was not borrowed by this member' });
        }

        const bookIndex = borrowedBooks.data.findIndex(b => b.bookCode === bookId);

        await LibraryService.updateBookStatus(bookId, 0);
        await LibraryService.removeBorrowedBook(memberId, bookId);

        const borrowDate = new Date(borrowedBooks.data[bookIndex].borrowDate);
        const now = new Date();
        const diffDays = Math.floor((now - borrowDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 7) {
            await LibraryService.updateMemberPenalty(memberId, 3);
        }

        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Cek semua buku
const getAllBooks = async (req, res) => {
    try {
        const books = await LibraryService.getAllBooks();
        res.status(books.code).json({
            meta: {
                code: books.code,
                status: books.status,
                message: books.message,
                page: books.meta
            },
            data: books.data
        });
    } catch (err) {
        res.status(500).json({
            meta: {
                code: 500,
                status: "Internal Server Error",
                message: err.message,
            },
        });
    }
};

// Cek semua anggota
const getAllMembers = async (req, res) => {
    try {
        const members = await LibraryService.getAllMembers();
        res.status(members.code).json({
            meta: {
                code: members.code,
                status: members.status,
                message: members.message,
                page: members.meta
            },
            data: members.data
        });
    } catch (err) {
        res.status(500).json({
            meta: {
                code: 500,
                status: "Internal Server Error",
                message: err.message,
            },
        });
    }
};

module.exports = {
    borrowBook,
    returnBook,
    getAllBooks,
    getAllMembers
};