import express from 'express';
import { votesData } from '~/controllers';

const router = express.Router();

router.get('/', votesData.getVotesData);

router.post('/', votesData.postVotesData);

module.exports = router;
