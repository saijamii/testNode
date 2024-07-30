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
    book: (parent, args) => data.books.find((b) => b.id === args.id),
  },
  Mutation: {
    addBook: (parent, args, context, info) => {
      if (data.books.find((b) => b.id === args.id)) {
        throw new Error("Book with this ID already exists.");
      }
      const newBook = { ...args, id: (data.books.length + 1).toString() };
      data.books.push(newBook);
      const author = data.authors.find((a) => a.id === args.authorId);
      if (author) {
        author.bookIds.push(newBook.id);
      }
      return newBook;
    },

    deleteBook: (parent, args) => {
      const bookIndex = data.books.findIndex((b) => b.id === args.id);
      if (bookIndex === -1) return null;
      const [deletedBook] = data.books.splice(bookIndex, 1);
      const author = data.authors.find((a) => a.id === deletedBook.authorId);
      if (author) {
        author.bookIds = author.bookIds.filter((bookId) => bookId !== args.id);
      }
      return deletedBook;
    },
    deleteAuthor: (parent, args) => {
      const authorIndex = data.authors.findIndex((a) => a.id === args.id);
      if (authorIndex === -1) return null;
      const [deletedAuthor] = data.authors.splice(authorIndex, 1);
      data.books = data.books.filter((b) => b.authorId !== args.id);
      return deletedAuthor;
    },
    addAuthor: (parent, args) => {
      if (data.authors.find((a) => a.id === args.id)) {
        throw new Error("Author with this ID already exists.");
      }
      const newAuthor = { id: args.id, name: args.name, bookIds: args.bookIds };
      data.authors.push(newAuthor);
      args.bookIds.forEach((bookId) => {
        const book = data.books.find((b) => b.id === bookId);
        if (book) {
          book.authorId = args.id;
        }
      });
      return newAuthor;
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
