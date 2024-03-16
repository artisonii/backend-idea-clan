const { registerResolver, loginResolver } = require("./authResolvers");
const {
  getBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
  buyBook,
  borrowFromBorrower,
} = require("./booksResolver");

const resolvers = {
  Query: {
    greetings: () => "Hello How are you ?",
    getBooks: getBooks,
    getSingleBook: getSingleBook,
  },
  Mutation: {
    register: registerResolver,
    login: loginResolver,
    addBook: addBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    buyBook: buyBook,
    borrowFromBorrower: borrowFromBorrower,
  },
};

module.exports = { resolvers };
