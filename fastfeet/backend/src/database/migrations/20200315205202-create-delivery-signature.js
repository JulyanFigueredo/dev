module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Deliveries', 'signatureId', {
      type: Sequelize.INTEGER,
      references: { model: 'Files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Deliveries', 'signatureId');
  },
};
