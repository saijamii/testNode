export const typeDefs = `#graphql
type Author {
  id: ID!
  name: String!
  books: [Book]
}

type Book {
  id: ID!
  title: String!
  publishedYear: Int
  author: Author
}

type Query {
  authors: [Author]
  author(id:ID!): Author
  books: [Book]
  book(id:ID!): Book
}

type Mutation {
  addBook(
    title: String!
    publishedYear: Int!
    authorId: ID!
  ): Book!
  deleteBook(id: ID!): Book
  deleteAuthor(id: ID!): Author
}
`;
