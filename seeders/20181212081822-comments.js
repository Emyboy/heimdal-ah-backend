export default {
  up: queryInterface => queryInterface.bulkInsert('comments', [{
    content: 'This actually good',
    userId: 1,
    articleId: 1,
    isPrivate: true,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'This is shit',
    userId: 1,
    articleId: 1,
    isArchived: false,
    isPrivate: false,
    commentId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'This is tooo goood',
    userId: 1,
    articleId: 1,
    isArchived: false,
    isPrivate: false,
    commentId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'This is lovely',
    userId: 2,
    articleId: 1,
    isArchived: false,
    isPrivate: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'This is very lovely',
    userId: 2,
    articleId: 1,
    isArchived: false,
    isPrivate: false,
    commentId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'This is too good. keep it up',
    userId: 2,
    articleId: 1,
    isArchived: false,
    isPrivate: true,
    commentId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    content: 'This actually sucks',
    userId: 1,
    articleId: 2,
    isPrivate: false,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'This actually isnt bad',
    userId: 2,
    articleId: 2,
    isArchived: false,
    isPrivate: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Try again later',
    userId: 1,
    articleId: 3,
    isArchived: true,
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Is it a wonderful world',
    userId: 2,
    articleId: 6,
    isPrivate: true,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Is nature beautiful',
    userId: 2,
    articleId: 6,
    isArchived: false,
    isPrivate: false,
    commentId: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Have fun with mother nature',
    userId: 2,
    articleId: 6,
    isArchived: false,
    isPrivate: true,
    commentId: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Let us enjoy life',
    userId: 2,
    articleId: 7,
    isArchived: true,
    isPrivate: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Life is sweetvtvtvtvtt',
    userId: 2,
    articleId: 7,
    isArchived: true,
    isPrivate: false,
    commentId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Life is sweetqqwwwwwwwww',
    userId: 1,
    articleId: 7,
    isArchived: true,
    isPrivate: false,
    commentId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Life is sweet0000000000',
    userId: 6,
    articleId: 7,
    isArchived: true,
    isPrivate: false,
    commentId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Life is sweet-=-=-=====',
    userId: 1,
    articleId: 2,
    isArchived: false,
    isPrivate: false,
    commentId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Life=-sxdfcg vhbgiugb',
    userId: 1,
    articleId: 2,
    isArchived: false,
    isPrivate: true,
    commentId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'oijhnvcghc',
    userId: 1,
    articleId: 2,
    isArchived: true,
    isPrivate: false,
    commentId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Adding Extra one',
    userId: 1,
    articleId: 1,
    isPrivate: false,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Let us enjoy this life',
    userId: 2,
    articleId: 7,
    isArchived: true,
    isPrivate: false,
    commentId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('comments', null, {})
};
