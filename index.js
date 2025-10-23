import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config()
connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4200' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Welcome to the Clothing Store API');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log('Server working correctly');
});
