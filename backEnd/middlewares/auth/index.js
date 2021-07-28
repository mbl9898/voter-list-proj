import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { logger } from '~/utils';
import { status } from '~/constants';

dotenv.config();

export const auth = async (req, res, next) => {
  //Codes that we might return coming from status
  const { UNAUTHROIZED, PRE_CONDITION_FAILED, BAD_REQUEST, FORBIDDEN } = status;

  // Expecting authorization field in header starting bearer followed by space and token
  if (
    !req.headers.authorization ||
    !req.headers.authorization.toLowerCase().includes('bearer')
  )
    return res.json({
      success: false,
      error: {
        code: UNAUTHROIZED,
        message: 'Access Denied! No Token Provided',
      },
    });

  try {
    //Splitting authorization based on space to get token
    const accessToken = req.headers.authorization.split(' ')[1];

    const validate = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = validate.user;
    next();
  } catch (e) {
    //Log in case of any abnormal crash
    logger('error', 'Error:', e.message);
    return res.json({
      success: false,
      error: {
        code: BAD_REQUEST,
        message: 'Invalid Token',
      },
    });
  }
};
