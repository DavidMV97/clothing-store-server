import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import path from 'path';
import { swaggerUi, swaggerSpec } from './swagger.js';
import { connectDB } from './config/db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import dotenv from 'dotenv'

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


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api', router);

app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message;

  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad Request
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  res.status(statusCode).json({
    success: false,
    error: {
      name: err.name,
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
});

app.listen(PORT, () => {
  console.log('Server working correctly');
});
