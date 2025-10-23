import { Router } from 'express';
import { newProduct,  showProducts, showProductbyId, updateProduct, deleteProduct } from '../controllers/ProductController.js';
import { uploadFile } from '../middleware/uploadFile.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Clothing Store API');
});


router.post('/products', 
  uploadFile,
  newProduct
);

router.get('/products',  showProducts);
router.get('/products/:id', showProductbyId);
router.put('/products/:id', uploadFile, updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;