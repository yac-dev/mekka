import express from 'express';
const router = express.Router();
import { getStickers, createStickerPreview, deleteStickerPreview } from '../controllers/stickers';
import multerParser from '../middlewares/multer';

router.route('/').get(getStickers);
router
  .route('/preview')
  .post(multerParser.single('originalStickerImage'), createStickerPreview)
  .patch(deleteStickerPreview);

export default router;
