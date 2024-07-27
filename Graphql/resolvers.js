const data = {
  authors: [
    { id: "1", name: "Author 1", bookIds: ["101", "102"] },
    { id: "2", name: "Author 2", bookIds: ["103", "104"] },
    { id: "3", name: "Author 3", bookIds: ["104", "105"] },
  ],
  books: [
    { id: "101", title: "Book 1", publishedYear: 2000, authorId: "1" },
    { id: "102", title: "Book 2", publishedYear: 2000, authorId: "1" },
    { id: "103", title: "Book 3", publishedYear: 2000, authorId: "2" },
    { id: "104", title: "Book 4", publishedYear: 2000, authorId: "2" },
    { id: "105", title: "Book 5", publishedYear: 2000, authorId: "3" },
  ],
};

export const resolvers = {
  Query: {
    authors: () => data.authors,
    author: (parent, args) => data.authors.find((a) => a.id === args.id),
    books: () => data.books,
    book: (parent, args) => data.books.find(b => b.id === args.id),
  },
  Mutation: {
    addBook: (parent, args, context, info) => {
      const newBook = { ...args, id: data.books.length + 1 };
      data.books.push(newBook);
      return newBook;
    },
  },
  Book: {
    author: (parent, args, context, info) =>
      data.authors.find((authorDetail) => authorDetail.id === parent.authorId),
  },
  Author: {
    books: (parent, args, context, info) =>
      data.books.filter((book) => parent.bookIds.includes(book.id)),
  },
};
