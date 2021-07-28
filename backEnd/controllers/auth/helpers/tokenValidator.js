import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
// import { logger } from '~/utils';
// import { status } from '~/constants';

dotenv.config();

export const validatorToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('Authorizatiokn Header must be provided');
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new Error('Token must be Bearer Token');
    }
    const validate = jwt.verify(token, process.env.JWT_SECRET);
    if (!validate) {
      throw new Error('Invalid Token');
    }
    return res.json({
      data: validate,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
