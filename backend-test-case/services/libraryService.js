const db = require('./db');
const helper = require('../helper');

// Cek jika anggota ada
const getMemberById = async (memberId) => {
    const rows = await db.query('SELECT * FROM members WHERE code = ?', [memberId]);
    const data = helper.emptyOrRows(rows);
    if (data.length > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Data found",
            data,
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

// Cek jika buku ada
const getBookById = async (bookId) => {
    const rows = await db.query('SELECT * FROM books WHERE code = ?', [bookId]);
    const data = helper.emptyOrRows(rows);
    if (data.length > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Data found",
            data,
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

// Cek buku yang dipinjam oleh anggota
const getBorrowedBooksByMemberId = async (memberId) => {
    const rows = await db.query('SELECT * FROM borrowed_books WHERE memberCode = ?', [memberId]);
    const data = helper.emptyOrRows(rows);
    // if (data.length > 0) {
    return {
        code: 200,
        status: "Success",
        message: "Data found",
        data,
    };
    // } else {
    return {
        code: 404,
        status: "Error",
        message: "Data not found"
    };
    // }
};

// Update status buku
const updateBookStatus = async (bookId, isBorrowed) => {
    const data = await db.query('UPDATE books SET isBorrowed = ? WHERE code = ?', [isBorrowed, bookId]);
    if (data.affectedRows > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Update category succeed",
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

// Insert ke tabel borrowed_books
const insertBorrowedBook = async (memberId, bookId) => {
    const data = await db.query('INSERT INTO borrowed_books (memberCode, bookCode, borrowDate) VALUES (?, ?, NOW())', [memberId, bookId]);
    if (data.affectedRows > 0) {
        return {
            code: 201,
            status: "Success",
            message: "Create category succeed"
        };
    } else {
        return {
            code: 400,
            status: "Bad Request",
            message: "Failed to create category"
        };
    }
};

// Hapus entri dari tabel borrowed_books
const removeBorrowedBook = async (memberId, bookId) => {
    const data = await db.query('DELETE FROM borrowed_books WHERE memberCode = ? AND bookCode = ?', [memberId, bookId]);
    if (data.affectedRows > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Delete user succeed",
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

// Cek jika anggota memiliki penalti
const getMemberPenaltyStatus = async (memberId) => {
    const rows = await db.query('SELECT penaltyEndDate FROM members WHERE code = ?', [memberId]);
    const data = helper.emptyOrRows(rows);
    if (data.length > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Data found",
            data,
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

// Update penalti anggota
const updateMemberPenalty = async (memberId, days) => {
    const data = await db.query('UPDATE members SET penaltyEndDate = DATE_ADD(NOW(), INTERVAL ? DAY) WHERE code = ?', [days, memberId]);
    if (data.affectedRows > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Update category succeed",
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

// Cek semua buku
const getAllBooks = async () => {
    const rows = await db.query('SELECT * FROM books WHERE isBorrowed = 0');
    const data = helper.emptyOrRows(rows);
    if (data.length > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Data found",
            data,
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

// Cek semua anggota
const getAllMembers = async () => {
    const rows = await db.query('SELECT *, (SELECT COUNT(*) FROM borrowed_books WHERE memberCode = members.code) AS borrowedCount FROM members');
    const data = helper.emptyOrRows(rows);
    if (data.length > 0) {
        return {
            code: 200,
            status: "Success",
            message: "Data found",
            data,
        };
    } else {
        return {
            code: 404,
            status: "Error",
            message: "Data not found"
        };
    }
};

module.exports = {
    getMemberById,
    getBookById,
    getBorrowedBooksByMemberId,
    updateBookStatus,
    insertBorrowedBook,
    removeBorrowedBook,
    getMemberPenaltyStatus,
    updateMemberPenalty,
    getAllBooks,
    getAllMembers
};