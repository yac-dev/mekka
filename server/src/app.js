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
import spaceAndUserRelationshipsRouter from './routers/spaceAndUserRelationships';

const app = express();
app.use(cors());
app.use(express.json());
// app.use('/badgeImages', express.static(path.join(__dirname, '..', 'badgeImages')));
// app.use('/reactionIconImages', express.static(path.join(__dirname, '..', 'reactionIconImages')));

app.get('/', (request, response) => {
  response.send('Hello guest');
});

app.use('/api/auth', authRouter);
app.use('/api/spaces', spacesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/reactionstatuses', reactionStatusesRouter);
app.use('/api/spaceanduserrelationships', spaceAndUserRelationshipsRouter);

export default app;
