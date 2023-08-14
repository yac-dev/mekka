import express from 'express';
const router = express.Router();
import { getTags } from '../controllers/tags';

router.route('/space/:spaceId').get(getTags);

export default router;
