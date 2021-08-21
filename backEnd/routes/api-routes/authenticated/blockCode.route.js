import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import {
  blockCode,
  getBlockCodeReqData,
  getBlockCodeTypes,
} from '~/controllers';
import { validate as validation } from '~/middlewares';
import { roles } from '~/constants';

const router = express.Router();
router.get('/', isAuthorized(roles.dataEntry), blockCode.getData);
router.get(
  '/:blockCode',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        blockCode: req.params.blockCode,
      },
      {
        blockCode: 'required|integer',
      },
    );
  },
  isAuthorized(roles.dataEntry),
  blockCode.getDataByBlockCode,
);

router.put(
  '/',
  (req, res, next) => {
    validation(req, res, next, getBlockCodeReqData(req), getBlockCodeTypes());
  },
  isAuthorized(roles.admin),
  blockCode.updateBlockCode,
);

router.post(
  '/',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      { ...getBlockCodeReqData(req) },
      { ...getBlockCodeTypes() },
    );
  },
  isAuthorized(roles.admin),
  blockCode.postData,
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
  blockCode.deleteRecord,
);

module.exports = router;
