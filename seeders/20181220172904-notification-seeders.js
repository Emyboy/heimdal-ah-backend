export default {
  up: queryInterface => queryInterface.bulkInsert('notifications', [
    {
      userId: 1,
      type: 'like',
      senderId: 2,
      message: '',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('notifications', null, {})
};
