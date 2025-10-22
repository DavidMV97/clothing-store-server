import { Router } from 'express';
import { newProduct } from '../controllers/ProductController.js';
import { uploadFile } from '../middleware/uploadFile.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Clothing Store API');
});


router.post('/products', 
  uploadFile,
  newProduct
);

export default router;