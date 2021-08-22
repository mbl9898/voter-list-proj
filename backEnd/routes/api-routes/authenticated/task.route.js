import express from 'express';
import { roles } from '~/constants';
import { isAuthorized } from 'middlewares/roles';
import { validate as validation } from '~/middlewares';
import { task } from '~/controllers';

const router = express.Router();

router.get('/', isAuthorized(roles.admin), task.getAllTasks);
router.get('/current', isAuthorized(roles.dataEntry), task.getCurrentUserTasks);
router.get('/:filename', isAuthorized(roles.dataEntry), task.downloadTaskFile);
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
        description: req.body.description,
      },
      {
        id: 'required|string',
        email: 'required|string|email',
        title: 'required|string',
        description: 'string',
      },
    );
  },
  isAuthorized(roles.admin),
  task.updateTask,
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
        description: req.body.description,
      },
      {
        email: 'required|string|email',
        title: 'required|string',
        description: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  task.createTask,
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
  task.deleteRecord,
);

module.exports = router;
