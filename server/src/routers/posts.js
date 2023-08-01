import express from 'express';
const router = express.Router();
import multerParser from '../middlewares/multer';
import { createPost } from '../controllers/posts';

router.route('/').post(multerParser.array('medias', 10), createPost);

export default router;
