import Sequelize, { Model } from 'sequelize';

export default class VendasStockAros extends Model {
  static init(sequelize) {
    super.init({

      quantidade_da_venda: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Quantidade do ítem precisa ser um número inteiro',
          },
        },
      },
      valor_total: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00,
        validate: {
          isFloat: {
            msg: 'O valor monetário deve ser apresentado com um ponto flutuante ou decimal ',
          },
        },
      },

    }, {
      sequelize,
      tableName: 'arosvendastock',
    });
    return this;
  }

  static associate(models) { // Criando a associação do model Students com o model Grade
    this.belongsTo(models.StockAros, { foreignKey: 'id' });
  }
}
