export const resolvers = {
  Query: {
    authors: () => {
      return [
        {
          id: 1,
          name: "S1",
        },
      ];
    },
    books: () => {
      return [
        {
          id: 1,
          title: "Book1",
          publishedYear: 221,
        },
      ];
    },
  },
};
