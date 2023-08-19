import express from 'express';
const router = express.Router();
import { createSpace, getSpaces, getSpace, getPostsBySpaceIdAndYearAndMonth } from '../controllers/spaces';
import multerParser from '../middlewares/multer';

router.route('/').post(multerParser.single('icon'), createSpace).get(getSpaces);
router.route('/:spaceId').get(getSpace);
router.route('/:spaceId/posts/:yearAndMonth').get(getPostsBySpaceIdAndYearAndMonth); // おそらくこんな具合だろう。。。

export default router;
