import express from 'express';
import cors from 'cors';
import './databases/mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import authRouter from './routers/auth';
import spacesRouter from './routers/spaces';
import postsRouter from './routers/posts';
import reactionStatusesRouter from './routers/reactionStatuses';
import customEmojisRouter from './routers/customEmojis';
import userAndReactionRelationshipsRouter from './routers/userAndReactionRelationships';
import spaceAndUserRelationshipsRouter from './routers/spaceAndUserRelationships';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/buffer/customemojis', express.static(path.join(__dirname, '..', 'buffer')));

app.get('/', (request, response) => {
  response.send('Hello guest');
});

app.use('/api/auth', authRouter);
app.use('/api/spaces', spacesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/reactionstatuses', reactionStatusesRouter);
app.use('/api/customemojis', customEmojisRouter);
app.use('/api/userandreactionrelationships', userAndReactionRelationshipsRouter);
app.use('/api/spaceanduserrelationships', spaceAndUserRelationshipsRouter);

export default app;
