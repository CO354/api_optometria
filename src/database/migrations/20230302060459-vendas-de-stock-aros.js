module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('arosvendastock', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      quantidade_da_venda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
      },
      stock_id: { // => Referece o id da tabela do aluno
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: 'stock_aros', // => Referencia o model da tabela de alunos "no caso"
          key: 'id', // O tipo de relacionamento
        },
        onDelete: 'CASCADE', // SE Apagar um aluno todas as fotos ficaram vazias, dessa forma nao, usamos "SET NULL" nao o CASCADE
        onUpdate: 'CASCADE', // Ele vai atualizar todo relacionado com o aluno quando o id for actualizado
      },
      valor_total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('arosvendastock');
  },
};
