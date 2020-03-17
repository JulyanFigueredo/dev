module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Deliveries', 'recipientId', {
      type: Sequelize.INTEGER,
      references: { model: 'Recipients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Deliveries', 'recipientId');
  },
};
