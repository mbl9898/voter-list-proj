import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import { authorized } from '~/controllers';
import { validate as validation } from '~/middlewares';
import { roles } from '~/constants';
import {
  getAuthorizedVoteFields,
  getAuthorizedVoteTypes,
} from '../../../controllers/authorized';
import { paginatedResults } from 'middlewares/pagination';
import { AuthorizedSchema } from 'schemas/authorized';

const router = express.Router();

router.get('/', isAuthorized(roles.dataViewer), authorized.getData);
router.get(
  '/page',
  isAuthorized(roles.dataViewer),
  paginatedResults(AuthorizedSchema),
  authorized.getPages,
);

router.post(
  '/',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      getAuthorizedVoteFields(req),
      getAuthorizedVoteTypes(),
    );
  },
  isAuthorized(roles.admin),
  authorized.uploadData,
);
router.post(
  '/update',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      getAuthorizedVoteFields(req),
      getAuthorizedVoteTypes(),
    );
  },
  isAuthorized(roles.admin),
  authorized.updateVoteData,
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
  authorized.deleteData,
);

module.exports = router;
