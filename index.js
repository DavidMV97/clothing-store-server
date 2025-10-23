import express from 'express';
import router from './routes/index.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'


dotenv.config()
connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Clothing Store API');
});


app.use('/api', router);

app.listen(PORT, () => {
  console.log('Server working correctly');
});
