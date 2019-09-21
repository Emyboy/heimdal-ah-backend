export default {
  up: queryInterface => queryInterface.bulkInsert('readerStats', [{
    userId: 5,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    articleId: 1,
    timeVisited: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('readerStats', null, {})
};
