import express from 'express';
const router = express.Router();
import { createSpace, getSpaces, getSpace } from '../controllers/spaces';
import multerParser from '../middlewares/multer';

router.route('/').post(multerParser.single('icon'), createSpace).get(getSpaces);
router.route('/:spaceId').get(getSpace);

export default router;
