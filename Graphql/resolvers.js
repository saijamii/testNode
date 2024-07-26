const data = {
  authors: [
    { id: "1", name: "Author 1", bookIds: ["101", "102"] },
    { id: "2", name: "Author 2", bookIds: ["103", "104"] },
    { id: "3", name: "Author 3", bookIds: ["104", "105"] },
  ],
  books: [
    { id: "101", title: "Book 1", publishedYear: 2000, authorld: "1" },
    { id: "102", title: "Book 2", publishedYear: 2000, authorld: "1" },
    { id: "103", title: "Book 3", publishedYear: 2000, authorld: "2" },
    { id: "105", title: "Book 3", publishedYear: 2000, authorld: "3" },
    { id: "104", title: "Book 3", publishedYear: 2000, authorld: "3" },
  ],
};

export const resolvers = {
  Query: {
    authors: (parent, args, context, info) => {
      return data.authors;
    },
    books: (parent, args, context, info) => {
      return data.books;
    },
  },
  Book: {
    author: (parent, args, context, info) => {
      return data.authors.find(
        (authorDetail) => authorDetail.id === parent.authorld
      );
    },
  },
  Author: {
    books: (parent, args, context, info) => {
      return data.books.find((book) => parent.bookIds.includes(book.id));
    },
  },
};
