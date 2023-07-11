import express from 'express';
const router = express.Router();
import { createSpace, getSpaces, getSpace } from '../controllers/spaces';

router.route('/').post(createSpace).get(getSpaces);
router.route('/:spaceId').get(getSpace);

export default router;
