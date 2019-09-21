export default {
  up: queryInterface => queryInterface.bulkInsert('tags', [{
    tagName: 'angular',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tagName: 'react',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tagName: 'nodejs',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tagName: 'football',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tagName: 'design',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('tags', null, {})
};
