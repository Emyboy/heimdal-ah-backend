export default {
  up: queryInterface => queryInterface.bulkInsert('replies', [{
    content: 'This actually good',
    userId: 1,
    commentId: 1,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'I love my family',
    userId: 5,
    commentId: 1,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Andela is Fun',
    userId: 5,
    commentId: 1,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'I have the best TTL',
    userId: 1,
    commentId: 1,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Mourinho has been sacked from United. ',
    userId: 5,
    commentId: 2,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Say it',
    userId: 1,
    commentId: 4,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('replies', null, {})
};
