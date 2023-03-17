import jwt from 'jsonwebtoken';
import Student from '../models/Student';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }
  const [, token] = authorization.split(' ');
  //   console.log(token);
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const student = await Student.findOne({ where: { id, email } });

    if (!student) {
      return res.status(401).json({
        errors: ['Usuário Inválido.'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errors: ['Token expirado ou invalido.'],
    });
  }
};
