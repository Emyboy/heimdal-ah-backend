/* eslint-disable no-unused-vars */
import chance from 'chance';
import slugify from 'slugify';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('articles', [{
    slug: 'this-is-a-post-title-l78hgybf',
    title: 'This is a post title',
    description: 'Descriptive title',
    body: 'Content',
    userId: 1,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-the-second-post-title-mbjb7y',
    title: 'This is the second post title',
    description: 'Second descriptive title',
    body: 'Content from article creation',
    userId: 2,
    isArchived: false,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-third-post-title-u87ddsa',
    title: 'This is the third post title',
    description: 'Third descriptive title',
    body: 'Content from article creation',
    userId: 3,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-third-pot-title-u87dda',
    title: 'This is the third post title',
    description: 'Third descriptive title',
    body: 'Content from article creation',
    userId: 4,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'this-is-trd-post-title-u87ddsa',
    title: 'This is the thir post title',
    description: 'Third descriptive title',
    body: 'Content from article creation',
    userId: 5,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'what-a-wonderful-world-u87dda',
    title: 'What a wonderful world title',
    description: 'This describes a world that is wonderful',
    body: 'Nature is a wonderful place',
    userId: 1,
    isArchived: true,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'it-is-fun-to-be-alive-u87dda',
    title: 'It is fun to be alive',
    description: 'It so much fun to be alive',
    body: 'Yeah, Live is such a sweet place',
    userId: 1,
    isArchived: false,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
