import express from 'express';
import cors from 'cors';
import './databases/mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
// app.use('/badgeImages', express.static(path.join(__dirname, '..', 'badgeImages')));
// app.use('/reactionIconImages', express.static(path.join(__dirname, '..', 'reactionIconImages')));

app.get('/', (request, response) => {
  response.send('Hello guest');
});

// app.use('/api/auth', authRouter);

export default app;
