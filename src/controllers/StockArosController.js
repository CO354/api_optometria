import StockAros from '../models/StockAros';

class StockArosController {
  async store(req, res) {
    try {
      const firstFind = await StockAros.findOne({
        where: {
          serie: req.body.serie,
          modelo: req.body.modelo,
          tipo_de_aro: req.body.tipo_de_aro,
          quantidade: req.body.quantidade,
          valor: req.body.valor,
        },
      });

      if (firstFind) {
        return res.status(401).json({
          errors: ['Este ítem já está cadastrado'],
        });
      }
      const newStockAros = await StockAros.create(req.body);

      const {
        id, serie, modelo, tipo_de_aro,
        quantidade, valor,
      } = newStockAros;
      return res.json({
        id,
        serie,
        modelo,
        tipo_de_aro,
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
      const stockAros = await StockAros.findAll({
        attributes: ['id', 'serie',
          'modelo',
          'tipo_de_aro',
          'quantidade',
          'valor',
        ],

      });
      return res.json(stockAros);
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

      const stockAros = await StockAros.findByPk(id, {
        attributes: ['id', 'serie',
          'modelo',
          'tipo_de_aro',
          'quantidade',
          'valor',

        ],
        order: [['id', 'DESC']],
      });

      if (!stockAros) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      return res.json(stockAros);
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

      const stockAros = await StockAros.findByPk(req.params.id);

      if (!stockAros) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      const newData = await StockAros.update(req.body, {
        where: {
          serie: stockAros.serie,
          modelo: stockAros.modelo,
          tipo_de_aro: stockAros.tipo_de_aro,
          quantidade: stockAros.quantidade,
          valor: stockAros.valor,

        },

      });
      const {

        serie, modelo, tipo_de_aro, quantidade, valor,
      } = newData;

      return res.json({
        serie,
        modelo,
        tipo_de_aro,
        quantidade,
        valor,
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

      const stockAros = await StockAros.findByPk(req.params.id);

      if (!stockAros) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      await stockAros.destroy();
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

export default new StockArosController();
