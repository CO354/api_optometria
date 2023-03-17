import VendasStockLentes from '../models/VendasStockLentes';
import StockLentes from '../models/StockLentes';

class VendasStockLentesController {
  async store(req, res) {
    try {
      if (isNaN(req.body.stock_id)) {
        return res.status(400).json({
          errors: 'ID inválido, tente passar um ID válido.',
        });
      }

      const verifyIdStock = await StockLentes.findOne({ where: { id: req.body.stock_id } });

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

      const newStockLentes = await VendasStockLentes.create(req.body);

      const {
        id, quantidade_da_venda, stock_id, valor_total,

      } = newStockLentes;

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
      const newStockLentes = await VendasStockLentes.findAll({
        attributes: ['id', 'quantidade_da_venda',
          'stock_id',
          'valor_total',

        ],
      });
      return res.json(newStockLentes);
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

      const stockLentes = await VendasStockLentes.findByPk(id, {
        attributes: ['id', 'quantidade_da_venda',
          'stock_id',
          'valor_total',

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

      const vendasStockLentes = await VendasStockLentes.findByPk(req.params.id);

      if (!vendasStockLentes) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      const newData = await VendasStockLentes.update(req.body, {
        where: {
          quantidade_da_venda: vendasStockLentes.quantidade_da_venda,
          valor_total: vendasStockLentes.valor_total,

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

      const vendasStockLentes = await VendasStockLentes.findByPk(req.params.id);

      if (!vendasStockLentes) {
        return res.status(400).json({
          errors: ['Este Item não existe'],
        });
      }
      await vendasStockLentes.destroy();
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

export default new VendasStockLentesController();
