import express from 'express';
import { auth } from '~/controllers';

const router = express.Router();
// logout logic
router.post('/', auth.logoutUser);

module.exports = router;
