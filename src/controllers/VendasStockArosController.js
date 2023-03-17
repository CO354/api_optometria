import VendasStockAros from '../models/VendasStockAros';
import StockAros from '../models/StockAros';

class VendasStockArosController {
  async store(req, res) {
    try {
      if (isNaN(req.body.stock_id)) {
        return res.status(400).json({
          errors: 'ID inválido, tente passar um ID válido.',
        });
      }

      const verifyIdStock = await StockAros.findOne({ where: { id: req.body.stock_id } });

      //   const valorItem = await StockLentes.findOne({
      //     where: {
      //       id: req.body.stock_id,
      //     },
      //   });

      //   console.log(valorItem.valor * req.body.quantidade_da_venda);
      if (!verifyIdStock) {
        return res.status(400).json({
          errors: ['Este ID não corresponde ao ítem.'],
        });
      }

      const newStockAros = await VendasStockAros.create(req.body);

      const {
        id, quantidade_da_venda, stock_id, valor_total,

      } = newStockAros;

      return res.json({
        id,
        quantidade_da_venda,
        stock_id,
        valor_total,

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
      const newStockAros = await VendasStockAros.findAll({
        attributes: ['id', 'quantidade_da_venda',
          'stock_id',
          'valor_total',

        ],
      });
      return res.json(newStockAros);
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

      const newStockAros = await VendasStockAros.findByPk(id, {
        attributes: ['id', 'quantidade_da_venda',
          'stock_id',
          'valor_total',

        ],
        order: [['id', 'DESC']],
      });

      if (!newStockAros) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      return res.json(newStockAros);
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

      const vendasStockAros = await VendasStockAros.findByPk(req.params.id);

      if (!vendasStockAros) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      const newData = await VendasStockAros.update(req.body, {
        where: {
          quantidade_da_venda: vendasStockAros.quantidade_da_venda,
          valor_total: vendasStockAros.valor_total,

        },

      });
      const {
        quantidade_da_venda,
        stock_id,
      } = newData;

      return res.json({
        quantidade_da_venda,
        stock_id,
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

      const vendasStockAros = await VendasStockAros.findByPk(req.params.id);

      if (!vendasStockAros) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      await vendasStockAros.destroy();
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

export default new VendasStockArosController();
