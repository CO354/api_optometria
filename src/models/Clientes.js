import Sequelize, { Model } from 'sequelize';

export default class Clientes extends Model {
  static init(sequelize) {
    super.init({
      serie: {
        type: Sequelize.STRING,
        defaultValue: '',

      },
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      apelido: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo Apelido deve ter entre 3 e 255 caracteres',
          },
        },
      },
      data_de_nascimento: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'A idade precisa ser um número inteiro',
          },
        },
      },
      genero: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      residencia: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      ocupacao: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      contacto: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      av_sc: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      prescricao: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      r_x: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      tipo_de_tratamento: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      pagamento: {
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
  }
}
