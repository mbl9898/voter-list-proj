import express from 'express';
import { roles } from '~/constants';
import { isAuthorized } from 'middlewares/roles';
import { validate as validation } from '~/middlewares';
import { payment } from '~/controllers';

const router = express.Router();

router.get('/', isAuthorized(roles.admin), payment.getAllPayments);
router.get(
  '/current',
  isAuthorized(roles.dataEntry),
  payment.getCurrentUserPayments,
);
router.get(
  '/:filename',
  isAuthorized(roles.dataEntry),
  payment.downloadPaymentReceipt,
);
router.put(
  '/:id',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        id: req.params.id,
        email: req.body.email,
        title: req.body.title,
        amount: req.body.amount,
        description: req.body.description,
      },
      {
        id: 'required|string',
        email: 'required|string|email',
        title: 'required|string',
        amount: 'required|integer',
        description: 'string',
      },
    );
  },
  isAuthorized(roles.admin),
  payment.updatePayment,
);

router.post(
  '/',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        email: req.body.email,
        title: req.body.title,
        amount: req.body.amount,
        description: req.body.description,
      },
      {
        email: 'required|string|email',
        title: 'required|string',
        amount: 'required|integer',
        description: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  payment.createPayment,
);

router.delete(
  '/:id',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        id: req.params.id,
      },
      {
        id: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  payment.deleteRecord,
);

module.exports = router;
