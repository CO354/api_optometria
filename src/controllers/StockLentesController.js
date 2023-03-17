import StockLentes from '../models/StockLentes';

class StockLentesController {
  async store(req, res) {
    try {
      const firstFind = await StockLentes.findOne({
        where: {
          graduacao: req.body.graduacao,
          modelo: req.body.modelo,
          quantidade: req.body.quantidade - 5,
          valor: req.body.valor.toFixed(2),
        },
      });

      if (firstFind) {
        return res.status(401).json({
          errors: ['Este ítem já está cadastrado'],
        });
      }
      const newStockLentes = await StockLentes.create(req.body);

      const {
        id, graduacao, modelo, quantidade,
        valor,
      } = newStockLentes;
      return res.json({
        id,
        graduacao,
        modelo,
        quantidade,
        valor,

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
      const stockLentes = await StockLentes.findAll({
        attributes: ['id', 'graduacao',
          'modelo',
          'quantidade',
          'valor',
        ],

      });
      return res.json(stockLentes);
    } catch (e) {
      return res.json({
        message: ['Nenhum dado foi cadastrado'],
      });
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

      const stockLentes = await StockLentes.findByPk(id, {
        attributes: ['id', 'graduacao',
          'modelo',
          'quantidade',
          'valor',

        ],
        order: [['id', 'DESC']],
      });

      if (!stockLentes) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      return res.json(stockLentes);
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

      const stockLentes = await StockLentes.findByPk(req.params.id);

      if (!stockLentes) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      const newData = await StockLentes.update(req.body, {
        where: {
          graduacao: stockLentes.graduacao,
          modelo: stockLentes.modelo,
          quantidade: stockLentes.quantidade,
          valor: stockLentes.valor,

        },

      });
      const {

        graduacao, modelo, quantidade, valor, saida,
      } = newData;

      return res.json({
        graduacao,
        modelo,
        quantidade,
        valor,
        saida,
        message: newData.push() === 1 ? 'item actualizado com sucesso' : 'O item não foi actualizado',
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

      const stockLentes = await StockLentes.findByPk(req.params.id);

      if (!stockLentes) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      await stockLentes.destroy();
      return res.json({
        message: ['Item selecionado deletado com sucesso.'],
      });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new StockLentesController();
