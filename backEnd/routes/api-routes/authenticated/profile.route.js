import express from 'express';
import { roles } from 'constants/roles';
import { profile } from '~/controllers';
import { validate as validation } from '~/middlewares';
import { isAuthorized } from 'middlewares/roles';

const router = express.Router();

//Patch route to password change
//Validation middleware will validate old_password,new_password,confirm_password field before proceeding further
router.patch(
  '/change-password',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        old_password: req.body.old_password,
        new_password: req.body.new_password,
        confirm_password: req.body.confirm_password,
      },
      {
        old_password: 'required|string',
        new_password:
          'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/',
        confirm_password: 'required|same:new_password',
      },
    );
  },
  profile.changePassword,
);

router.get('/', profile.userData);
router.put(
  '/changeRole',
  isAuthorized(roles.admin),
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        userId: req.body.userId,
        role: req.body.role,
      },
      {
        userId: 'required|string',
        role: 'required|string',
      },
    );
  },
  profile.changeRole,
);
router.put(
  '/changeRate',
  isAuthorized(roles.admin),
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        userId: req.body.userId,
        rate: req.body.rate,
      },
      {
        userId: 'required|string',
        rate: 'required|integer',
      },
    );
  },
  profile.changeRate,
);

module.exports = router;
