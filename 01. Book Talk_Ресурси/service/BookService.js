//model ot thing
const Book = require('../models/Book')


// CRUD OPERATION FOR MODEL
exports.getOne = (bookId) => Book.findById(bookId)

exports.update = (bookId,data) => Book.findByIdAndUpdate(bookId,data, {runValidators: true})

exports.delete = (bookId) => Book.findByIdAndDelete(bookId)

exports.wishes = async (userId, bookId) => {

    const book = await Book.findById(bookId);

    book.wishingList.push(userId)

    return book.save();
}


exports.getWishedBooks = async (userId) => {
    const allBooks = await Book.find({}).lean();
    const books = [];

    function findUserId(book) {

        if (book.wishList?.some((id) => id == userId)){
            books.push(book);
        }
        
    }

    allBooks.forEach(findUserId);

    return books
} 