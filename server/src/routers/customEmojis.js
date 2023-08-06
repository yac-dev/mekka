import express from 'express';
const router = express.Router();
import { getCustomEmojis, createEmojiPreview } from '../controllers/customEmojis';
import multerParser from '../middlewares/multer';

router.route('/').get(getCustomEmojis);
router.route('/preview').post(multerParser.single('originalEmojiImage'), createEmojiPreview);

export default router;
