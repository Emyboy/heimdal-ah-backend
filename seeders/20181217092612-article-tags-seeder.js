export default {
  up: queryInterface => queryInterface.bulkInsert('ArticleTags', [{
    articleId: '3',
    tagId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    articleId: '4',
    tagId: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    articleId: '5',
    tagId: '3',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('ArticleTags', null, {})
};
