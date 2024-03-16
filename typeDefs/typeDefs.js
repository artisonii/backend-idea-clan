const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    role: String
  }
  type registerResponse {
    message: String
    success: Boolean
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type loginResponse {
    name: String
    token: String
    message: String!
    role: String
    success: Boolean
  }
  enum BookStatus {
    AVAILABLE
    BORROWED
    SOLD
  }
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type Book {
    id: ID!
    title: String!
    author: String!
    genre: String!
    owner: User
    status: BookStatus
  }
  input BooksParams {
    page: Int
    pageSize: Int
    genre: String
    sort: String
    order: String
    title: String
    author: String
    status: BookStatus
  }
  type BookResponse {
    data: [Book]
    page: Int
    totalPages: Int
    totalItems: Int
    message: String
    success: Boolean
  }
  type GeneralResponse {
    message: String
    success: Boolean
  }
  type Query {
    greetings: String
    getBooks(params: BooksParams): BookResponse
    getSingleBook(id: ID!): Book
  }
  input UpdateBookInput {
    id: ID!
    title: String
    author: String
    genre: String
    status: BookStatus
  }
  type Mutation {
    register(input: RegisterInput): registerResponse
    login(input: LoginInput): loginResponse
    addBook(title: String!, author: String!, genre: String!): GeneralResponse
    deleteBook(id: ID!): GeneralResponse
    updateBook(input: UpdateBookInput): GeneralResponse
    buyBook(id: ID!): GeneralResponse
    borrowFromBorrower(id: ID!): GeneralResponse
  }
`;

module.exports = { typeDefs };
