import express from 'express';
const router = express.Router();
import { signup, loadMe } from '../controllers/auth';
import { authorization } from '../middlewares/authorization';

router.post('/signup', signup);
router.get('/loadme', authorization, loadMe);

export default router;
