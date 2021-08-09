import { roles } from 'constants/roles';
import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import { validate as validation } from '~/middlewares';
import { auth } from '~/controllers';

const router = express.Router();

router.get('/allUsers', isAuthorized(roles.admin), auth.getAllUsers);

router.put(
    '/approval',
    isAuthorized(roles.admin),
    (req, res, next) => {
      validation(
        req,
        res,
        next,
        {
          userId: req.body.userId,
          isApproved: req.body.isApproved,
        },
        {
          userId: 'required|string',
          isApproved: 'required|boolean',
        },
      );
    },
    auth.approveAccount,
  );

module.exports = router;
