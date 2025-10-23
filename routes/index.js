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
 *         description: An object containing a list of products and pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       category:
 *                         type: string
 *                         enum: [Casual, Formal, Sporty, Urban, Elegant, Vintage]
 *                       price:
 *                         type: number
 *                       value:
 *                         type: number
 *                       stock:
 *                         type: number
 *                       description:
 *                         type: string
 *                       productImage:
 *                         type: string
 *                       productImageUrl:
 *                         type: string
 *                         nullable: true
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 *             examples:
 *               productsResponse:
 *                 value:
 *                   products:
 *                     - _id: "68fa68d17d34efa7efc496dd"
 *                       name: "Soft cotton t-shirt"
 *                       category: "Casual"
 *                       price: 29.99
 *                       value: 10.99
 *                       stock: 100
 *                       description: "Soft cotton t-shirt"
 *                       productImage: "LfCksA9tL.jpeg"
 *                       __v: 0
 *                       productImageUrl: "http://localhost:3000/uploads/LfCksA9tL.jpeg"
 *                     - _id: "68fa690c7d34efa7efc496e3"
 *                       name: "Soft cotton t-shirt 2"
 *                       category: "Casual"
 *                       price: 29.99
 *                       value: 10.99
 *                       stock: 100
 *                       description: "Soft cotton t-shirt"
 *                       productImage: "05ar_cmgJ.jpeg"
 *                       __v: 0
 *                       productImageUrl: "http://localhost:3000/uploads/05ar_cmgJ.jpeg"
 *                   pagination:
 *                     currentPage: 1
 *                     totalPages: 1
 *                     totalItems: 2
 *                     itemsPerPage: 10
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
 *         description: Product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                   enum: [Casual, Formal, Sporty, Urban, Elegant, Vintage]
 *                 price:
 *                   type: number
 *                   minimum: 0
 *                 value:
 *                   type: number
 *                   minimum: 0
 *                 stock:
 *                   type: number
 *                   minimum: 0
 *                 description:
 *                   type: string
 *                 productImage:
 *                   type: string
 *                 productImageUrl:
 *                   type: string
 *                   nullable: true
 *             examples:
 *               product:
 *                 value:
 *                   _id: "64a1f2e5b6c7d8f9a0b1c2d3"
 *                   name: "Soft cotton t-shirt"
 *                   category: "Casual"
 *                   price: 29.99
 *                   value: 10.99
 *                   stock: 100
 *                   description: "Soft cotton t-shirt"
 *                   productImage: "image-file.jpg"
 *                   productImageUrl: "http://localhost:3000/uploads/image-file.jpg"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
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