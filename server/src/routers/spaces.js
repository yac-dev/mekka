import express from 'express';
const router = express.Router();
import {
  createSpace,
  getSpaces,
  getSpace,
  getPostsBySpaceId,
  getPostsBySpaceIdAndYearAndMonth,
  getTagsBySpaceId,
} from '../controllers/spaces';
import multerParser from '../middlewares/multer';

router.route('/').post(multerParser.single('icon'), createSpace).get(getSpaces);
router.route('/:spaceId').get(getSpace);
router.route('/:spaceId/posts').get(getPostsBySpaceId);
router.route('/:spaceId/posts/:yearAndMonth').get(getPostsBySpaceIdAndYearAndMonth);
router.route('/:spaceId/tags').get(getTagsBySpaceId);

export default router;
