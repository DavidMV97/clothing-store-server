
import colors from 'colors'
import Product from '../models/Product.js';

export const newProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);

    if (req.file?.filename) {
      product.productImage = req.file.filename;
    }

    await product.save();
    return res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(colors.red.bold('Error creating the product:', error));  
    next(error);
  }
};


export const showProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    } 
    
    // Filter by name (case insensitive search)
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    // Get products with filters and pagination
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    const host = `${req.protocol}://${req.get('host')}`;
    const productsWithUrls = products.map((p) => {
      const productObj = p.toObject();
      if (productObj.productImage) {
        productObj.productImageUrl = `${host}/uploads/${productObj.productImage}`;
      } else {
        productObj.productImageUrl = null;
      }
      return productObj;
    });

  
    res.json({
      products: productsWithUrls,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error(colors.red.bold('Error', error));
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

export const showProductbyId = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return next();
    }
    const host = `${req.protocol}://${req.get('host')}`;
    const productObj = product.toObject();
    if (productObj.productImage) {
      productObj.productImageUrl = `${host}/uploads/${productObj.productImage}`;
    } else {
      productObj.productImageUrl = null;
    }
    res.json(productObj);
  } catch (error) {
    console.error(colors.red.bold('Error', error));
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    let newProduct = req.body;

    if (req.file) {
      newProduct.productImage = req.file.filename;
    } else {
      let oldProduct = await Product.findById(req.params.id);
      newProduct.productImage = oldProduct.productImage;
    }

    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      newProduct,
      { new: true, runValidators: true }
    );
    res.json({ message: 'Product updated', product });
  } catch (error) {
    console.error(colors.red.bold('Error', error));
    next(error);
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(colors.red.bold('Error', error));
    next(error);
  }
}