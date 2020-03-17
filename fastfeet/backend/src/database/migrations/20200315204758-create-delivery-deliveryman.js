module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Deliveries', 'deliverymanId', {
      type: Sequelize.INTEGER,
      references: { model: 'Deliverymans', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Deliveries', 'deliverymanId');
  },
};
