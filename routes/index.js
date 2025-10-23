import { Router } from 'express';
import { newProduct, showProducts, showProductbyId, updateProduct, deleteProduct } from '../controllers/ProductController.js';
import { uploadFile } from '../middleware/uploadFile.js';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Soft cotton t-shirt"
 *               category:
 *                 type: string
 *                 enum: [Casual, Formal, Sporty, Urban, Elegant, Vintage]
 *                 example: "Casual"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: "Soft cotton t-shirt"
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid category or validation error
 *       500:
 *         description: Server error
 */
router.post('/products',
  uploadFile,
  newProduct
);


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (with pagination and filters)
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product List
 */
router.get('/products', showProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: 
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/products/:id', showProductbyId);


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               value:
 *                 type: number
 *               stock:
 *                 type: number
 *               description:
 *                 type: string
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put('/products/:id', uploadFile, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete('/products/:id', deleteProduct);

export default router;