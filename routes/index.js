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
 *             required:
 *               - name
 *               - category
 *               - price
 *               - value
 *               - stock
 *               - description
 *               - productImage
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Soft cotton t-shirt"
 *                 description: "Product name (required)"
 *               category:
 *                 type: string
 *                 enum: [Casual, Formal, Sporty, Urban, Elegant, Vintage]
 *                 example: "Casual"
 *                 description: "Product category (required)"
 *               price:
 *                 type: number
 *                 example: 29.99
 *                 minimum: 0
 *                 description: "Product price (required)"
 *               value:
 *                 type: number
 *                 example: 10.99
 *                 minimum: 0
 *                 description: "Product value (required)"               
 *               stock:
 *                 type: integer
 *                 example: 100
 *                 minimum: 0
 *                 description: "Product stock quantity (required)"
 *               description:
 *                 type: string
 *                 example: "Soft cotton t-shirt"
 *                 description: "Product description (required)"
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: "Product image file (required)"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: validation error
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
 *             required:
 *               - name
 *               - category
 *               - price
 *               - value
 *               - stock
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Soft cotton t-shirt"
 *                 description: "Product name (required)"
 *               category:
 *                 type: string
 *                 enum: [Casual, Formal, Sporty, Urban, Elegant, Vintage]
 *                 example: "Casual"
 *                 description: "Product category (required)"
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 29.99
 *                 description: "Product price (required)"
 *               value:
 *                 type: number
 *                 minimum: 0
 *                 example: 10.99
 *                 description: "Product value (required)"
 *               stock:
 *                 type: number
 *                 minimum: 0
 *                 example: 100
 *                 description: "Product stock quantity (required)"
 *               description:
 *                 type: string
 *                 example: "Soft cotton t-shirt"
 *                 description: "Product description (required)"
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: "Product image file"
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