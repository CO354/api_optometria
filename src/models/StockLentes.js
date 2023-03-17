import Sequelize, { Model } from 'sequelize';

export default class StockLentes extends Model {
  static init(sequelize) {
    super.init({

      graduacao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 15],
            msg: 'Este campo precisa ter 8 ou mais caracteres',
          },

        },
      },
      modelo: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 15],
            msg: 'Este campo precisa ter 8 ou mais caracteres',
          },

        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Quantidade do ítem precisa ser um número inteiro',
          },
        },
      },
      valor: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'O valor monetário deve ser apresentado com um ponto flutuante ou decimal ',
          },
        },
      },

    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) { // Criando a associação do model Students com o model Grade
    this.hasMany(models.VendasStockLentes, { foreignKey: 'stock_id' });
  }
}
