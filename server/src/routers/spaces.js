import express from 'express';
const router = express.Router();
import { createSpace, getSpaces } from '../controllers/spaces';

router.route('/').post(createSpace).get(getSpaces);

export default router;
