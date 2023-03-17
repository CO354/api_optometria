import Clientes from '../models/Clientes';

class ClientesController {
  async store(req, res) {
    try {
      const findData = await Clientes.findOne({ where: { nome: req.body.nome, apelido: req.body.apelido } });

      if (findData) {
        return res.status(401).json({
          errors: ['Este Cliente já esta cadastrado na base de dados '],
        });
      }
      const newClientes = await Clientes.create(req.body);

      const {
        id, serie, nome, apelido,
        data_de_nascimento, idade,
        genero, residencia, ocupacao,
        contacto, av_sc, prescricao,
        r_x, tipo_de_tratamento, pagamento,
      } = newClientes;
      return res.json({
        id,
        serie,
        nome,
        apelido,
        data_de_nascimento,
        idade,
        genero,
        residencia,
        ocupacao,
        contacto,
        av_sc,
        prescricao,
        r_x,
        tipo_de_tratamento,
        pagamento,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const clientes = await Clientes.findAll({
        attributes: ['id', 'serie',
          'nome',
          'apelido',
          'data_de_nascimento',
          'idade',
          'genero',
          'residencia',
          'ocupacao',
          'contacto',
          'av_sc',
          'prescricao',
          'r_x',
          'tipo_de_tratamento',
          'pagamento'],
      });
      return res.json(clientes);
    } catch (e) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return res.status(400).json({
          errors: ['Faltando ID ou não corresponde a um ID'],
        });
      }

      const clientes = await Clientes.findByPk(id, {
        attributes: ['id', 'serie',
          'nome',
          'apelido',
          'data_de_nascimento',
          'idade',
          'genero',
          'residencia',
          'ocupacao',
          'contacto',
          'av_sc',
          'prescricao',
          'r_x',
          'tipo_de_tratamento',
          'pagamento'],
        order: [['id', 'DESC']],
      });

      if (!clientes) {
        return res.status(400).json({
          errors: ['Este Cliente não existe'],
        });
      }
      return res.json(clientes);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }

      const clientes = await Clientes.findByPk(req.params.id);

      if (!clientes) {
        return res.status(400).json({
          errors: ['Este Cliente não existe'],
        });
      }
      const newData = await Clientes.update(req.body, {
        where: {
          id: clientes.id,
          serie: clientes.serie,
          nome: clientes.nome,
          apelido: clientes.apelido,
          data_de_nascimento: clientes.data_de_nascimento,
          idade: clientes.idade,
          genero: clientes.genero,
          residencia: clientes.residencia,
          ocupacao: clientes.ocupacao,
          contacto: clientes.contacto,
          av_sc: clientes.av_sc,
          prescricao: clientes.prescricao,
          r_x: clientes.r_x,
          tipo_de_tratamento: clientes.tipo_de_tratamento,
          pagamento: clientes.pagamento,
        },

      });
      const {
        id,
        serie,
        nome,
        apelido,
        data_de_nascimento,
        idade,
        genero,
        residencia,
        ocupacao,
        contacto,
        av_sc,
        prescricao,
        r_x,
        tipo_de_tratamento,
        pagamento,
      } = newData;

      return res.json({
        id,
        serie,
        nome,
        apelido,
        data_de_nascimento,
        idade,
        genero,
        residencia,
        ocupacao,
        contacto,
        av_sc,
        prescricao,
        r_x,
        tipo_de_tratamento,
        pagamento,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      if (req.params.id) {
        if (isNaN(req.params.id)) {
          res.json({
            errors: ['O ID inválido'],
          });
        }
      }

      const clientes = await Clientes.findByPk(req.params.id);

      if (!clientes) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      await clientes.destroy();
      return res.json({
        message: ['Usuário deletado'],
      });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ClientesController();
