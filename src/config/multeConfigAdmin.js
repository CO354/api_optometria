import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000); // => gerando aleatoriamente o tempo do aquivo automatico

export default {
  fileFilter: (req, file, cb) => { // => filtrando o tipo de arquivo
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'
     && file.mimetype !== 'image/tiff') {
      return cb(new multer.MulterError('Arquivo precisar ser PNG ou JPEG'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images', 'admin'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};

// DATE.NOW VAI PEGAR O VALOR DE DIFIRENTE DAS FOTOS
// Extname para a extencao do arquivo
