import dotenv from 'dotenv';

dotenv.config();
import { resolve } from 'path';
import './src/database';
import express from 'express';

import helmet from 'helmet';
import cors from 'cors';
import clientes from './src/routers/clientesRoutes';
import stockLentes from './src/routers/stockLentesroutes';
import stockAros from './src/routers/stockArosroutes';
import vendasStockLentes from './src/routers/vendasStockLentesroutes';
import vendasStockAros from './src/routers/vendasStockArosroutes';

// import delay from 'express-delay';

// const whiteList = [
//   'https://dominio_do_que_poderam_usar_essa API1',
//   'https://dominio_do_que_poderam_usar_essa API2',
//   'https://dominio_do_que_poderam_usar_essa API3',
// ];
// const corsOptions = {
//   origin(origin, callback) {
//     if (whiteList.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(delay(2000));
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/clientes/', clientes);
    this.app.use('/stock/', stockLentes);
    this.app.use('/stock', stockAros);
    this.app.use('/vendas/stock/', vendasStockLentes);
    this.app.use('/vendas/stock/', vendasStockAros);
  }
}

export default new App().app;
