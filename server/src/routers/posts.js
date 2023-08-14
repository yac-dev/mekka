import express from 'express';
const router = express.Router();
import multerParser from '../middlewares/multer';
import { createPost, getPosts, getPost } from '../controllers/posts';

router.route('/').post(multerParser.array('contents', 10), createPost);
router.route('/:postId').get(getPost);
router.route('/space/:spaceId').get(getPosts);

export default router;
