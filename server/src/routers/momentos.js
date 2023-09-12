import express from 'express';
const router = express.Router();
import multerParser from '../middlewares/multer';
import { createMomento, getMomentosBySpaceId } from '../controllers/momentos';

router.route('/').post(multerParser.array('contents', 10), createMomento);
// router.route('/:momentoId').get(getPost);
router.route('/:spaceId').get(getMomentosBySpaceId);

export default router;
