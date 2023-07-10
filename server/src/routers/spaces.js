import express from 'express';
const router = express.Router();
import { createSpace } from '../controllers/spaces';

router.route('/').post(createSpace);

export default router;
