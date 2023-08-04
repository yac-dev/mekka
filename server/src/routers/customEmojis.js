import express from 'express';
const router = express.Router();
import { getCustomEmojis } from '../controllers/customEmojis';

router.route('/').get(getCustomEmojis);

export default router;
