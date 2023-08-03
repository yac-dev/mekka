import express from 'express';
const router = express.Router();
import { createReaction } from '../controllers/userAndReactionRelationships';

router.route('/user/:userId/post/:postId').post(createReaction);

export default router;
