import express from 'express';
const router = express.Router();
import { getCustomEmojis, createEmojiPreview, deleteEmojiPreview } from '../controllers/customEmojis';
import multerParser from '../middlewares/multer';

router.route('/').get(getCustomEmojis);
router.route('/preview').post(multerParser.single('originalEmojiImage'), createEmojiPreview).patch(deleteEmojiPreview);

export default router;
