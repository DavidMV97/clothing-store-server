import express from 'express';
import router from './routes/index.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'


dotenv.config()
connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
