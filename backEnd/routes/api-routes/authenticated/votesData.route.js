import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import { votesData } from '~/controllers';
import { roles } from '~/constants';

const router = express.Router();

router.get('/', isAuthorized(roles.dataViewer), votesData.getVotesData);

router.post('/', votesData.postVotesData);

module.exports = router;
