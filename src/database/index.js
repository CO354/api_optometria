import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Clientes from '../models/Clientes';
import StockLentes from '../models/StockLentes';
import StockAros from '../models/StockAros';
import VendasStockLentes from '../models/VendasStockLentes';
import VendasStockAros from '../models/VendasStockAros';

// Todos os models adicionaremos nesse array

const models = [Clientes, StockLentes, StockAros, VendasStockLentes, VendasStockAros];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
