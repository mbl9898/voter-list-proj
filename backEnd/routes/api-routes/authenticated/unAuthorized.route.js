import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import { getVoteData, getVoteTypes, unAuthorized } from '~/controllers';
import { validate as validation } from '~/middlewares';
import { roles } from '~/constants';

const router = express.Router();

router.get('/', isAuthorized(roles.admin), unAuthorized.getData);
router.get(
  '/rejectedVotes',
  isAuthorized(roles.dataEntry),
  unAuthorized.getRejectedVotes,
);

router.get(
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
  unAuthorized.getDataById,
);

router.post(
  '/',
  (req, res, next) => {
    validation(req, res, next, getVoteData(req), getVoteTypes());
  },
  isAuthorized(roles.dataEntry),
  unAuthorized.uploadData,
);

router.put(
  '/rejectVote',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        id: req.body.id,
        rejections: req.body.rejections,
      },
      {
        id: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  unAuthorized.rejectVote,
);

router.put(
  '/updateRejectedVote',
  (req, res, next) => {
    validation(req, res, next, getVoteData(req), getVoteTypes());
  },
  isAuthorized(roles.dataEntry),
  unAuthorized.updateRejectedVote,
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
  unAuthorized.deleteRecord,
);

module.exports = router;
