import { roles } from 'constants/roles';
import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import { validate as validation } from '~/middlewares';
import { auth } from '~/controllers';

const router = express.Router();

router.get('/allUsers', isAuthorized(roles.admin), auth.getAllUsers);

router.put(
  '/',
  isAuthorized(roles.admin),
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        userId: req.body._id,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        rate: req.body.email,
        assignedBlockCodes: req.body.assignedBlockCodes,
      },
      {
        userId: 'required|string',
        username: 'required|string',
        email: 'required|string',
        role: 'required|string',
        rate: 'required|string',
        // assignedBlockCodes: 'required|array',
      },
    );
  },
  auth.updateUser,
);

router.put(
  '/setDefaultBlockCode',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        userId: req.body._id,
        defaultBlockCode: req.body.defaultBlockCode,
      },
      {
        userId: 'required|string',
        defaultBlockCode: 'required|string',
      },
    );
  },
  auth.setDefaultBlockCode,
);

module.exports = router;
