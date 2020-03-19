module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('DeliveryProblems', 'deliveryId', {
      type: Sequelize.INTEGER,
      references: { model: 'Deliveries', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('DeliveryProblems', 'deliveryId');
  },
};
