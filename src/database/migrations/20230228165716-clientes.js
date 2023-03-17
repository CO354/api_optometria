module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      serie: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apelido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_de_nascimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      residencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ocupacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contacto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      av_sc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prescricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      r_x: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_de_tratamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pagamento: {
        type: Sequelize.FLOAT,
        allowNull: true,
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
    await queryInterface.dropTable('clientes');
  },
};
