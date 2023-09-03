import express from 'express';
const router = express.Router();
import multerParser from '../middlewares/multer';
import { createPost, getPost, getPostsByTagId, getPostsByUserId, getPostsByLocationTagId } from '../controllers/posts';

router.route('/').post(multerParser.array('contents', 10), createPost);
router.route('/:postId').get(getPost);
router.route('/tag/:tagId').get(getPostsByTagId);
router.route('/user/:userId/space/:spaceId').get(getPostsByUserId);
router.route('/location/:locationTagId/space/:spaceId').get(getPostsByLocationTagId);

export default router;
