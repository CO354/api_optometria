import Sequelize, { Model } from 'sequelize';

export default class StockAros extends Model {
  static init(sequelize) {
    super.init({

      serie: {
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
            args: [4, 15],
            msg: 'O campo modelo precisa ter 8 ou mais caracteres',
          },

        },

      },
      tipo_de_aro: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 15],
            msg: 'O campo tipo de aro precisa ter 8 ou mais caracteres',
          },

        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
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
    this.hasMany(models.VendasStockAros, { foreignKey: 'stock_id' });
  }
}
