const { BookModel } = require("../models/books.model");

const getBooks = async (_, { params }) => {
  console.log("Hit 1");
  try {
    const page = parseInt(params?.page) || 1;
    const pageSize = parseInt(params?.pageSize) || 10;

    let query = {};
    console.log("hit");
    // Filtering option
    if (params?.genre) {
      query.genre = params?.genre;
    }
    if (params?.status) {
      query.status = params?.status;
    }

    // Sorting logic
    const sortOptions = {};
    if (params?.sort) {
      // Assuming sort is a query parameter containing the field to sort by
      sortOptions[params.sort] = params.order === "desc" ? -1 : 1;
    }

    // Searchfor title
    if (params?.title) {
      query.title = { $regex: new RegExp(params.title, "i") };
    }

    //search for author
    if (params?.author) {
      query.author = { $regex: new RegExp(params.author, "i") };
    }

    const totalItems = await BookModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);

    const data = await BookModel.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    console.log(data);
    return {
      data,
      page,
      totalPages,
      totalItems,
    };
  } catch (error) {
    console.log(error);
    return { message: "Internal Serer Error!", success: false };
  }
};

const getSingleBook = async (_, { id }) => {
  try {
    const book = await BookModel.findOne({ _id: id });
    if (book) {
      return book;
    } else {
      return { message: "Book not found", success: false };
    }
  } catch (error) {
    return { message: "Internal Serer Error!", success: false };
  }
};

const addBook = async (_, { title, author, genre }, { userId, role }) => {
  if (!(userId && role === "admin")) {
    return { message: "Unathorized", success: false };
  }

  try {
    if (title && author && genre) {
      const data = await BookModel.create({
        title,
        author,
        genre,
        owner: userId,
      });
      return { message: "Book has been added successfuly", success: true };
    } else {
      return { message: "please fill all the details", success: false };
    }
  } catch (error) {
    return { message: "Internal Serer Error!", success: false };
  }
};

const deleteBook = async (_, { id }, { userId, role }) => {
  if (!(userId && role === "admin")) {
    return { message: "Unathorized", success: false };
  }
  try {
    const data = await BookModel.findOneAndDelete({ _id: id, owner: userId });
    if (data) {
      return { message: "Book deleted successfully", success: true };
    } else {
      return { message: "Book not found", success: false };
    }
  } catch (error) {
    return { message: "Internal server error!", success: false };
  }
};

const updateBook = async (_, { input }, { userId, role }) => {
  if (!(userId && role === "admin")) {
    return { message: "Unathorized", success: false };
  }
  try {
    const { id, ...rest } = input;
    const data = await BookModel.findOneAndUpdate(
      { _id: id, owner: userId },
      { ...rest }
    );
    if (data) {
      return { message: "Book updated successfully", success: true };
    } else {
      return { message: "Book not found", success: false };
    }
  } catch (error) {
    return { message: "Internal server error!", success: false };
  }
};

const buyBook = async (_, { id, orderType }, { userId, role }) => {
  if (!userId) {
    return { message: "Please Login first!", success: false };
  }

  try {
    const book = await BookModel.findOne({ _id: id });
    if (book) {
      if (book.status === "AVAILABLE") {
        if (orderType === "buy") {
          const { _id, ...rest } = book;
          const data = await BookModel.findOneAndUpdate(
            { _id: id },
            { status: "SOLD", buyer: userId }
          );
          return { message: "book has been sold successfully", success: true };
        } else if (orderType === "borrow") {
          const { _id, ...rest } = book;
          const data = await BookModel.findOneAndUpdate(
            { _id: id },
            { status: "BORROWED", buyer: userId }
          );
          return {
            message: "book has been borrowed successfully",
            success: true,
          };
        }
      } else {
        return { message: "book is not available", success: false };
      }
    } else {
      return { message: "book not found", success: false };
    }
  } catch (error) {
    return { message: "Internal Server Error", success: false };
  }
};

const borrowFromBorrower = async (_, { id }, { userId, role }) => {
  if (!userId) {
    return { message: "Please Login first!", success: false };
  }

  try {
    const book = await BookModel.findOne({ _id: id });
    if (book) {
      if (book.status === "BORROWED") {
        const { _id, ...rest } = book;
        const data = await BookModel.findOneAndUpdate(
          { _id: id },
          { status: "BORROWED", buyer: userId }
        );
        return {
          message: "book has been borrowed successfully",
          success: true,
        };
      } else {
        return { message: "book is not available to borrow", success: false };
      }
    } else {
      return { message: "book not found", success: false };
    }
  } catch (error) {
    return { message: "Internal Server Error", success: false };
  }
};

module.exports = {
  getBooks,
  getSingleBook,
  addBook,
  deleteBook,
  updateBook,
  buyBook,
  borrowFromBorrower,
};
