
import colors from 'colors'
import Product from '../models/Product.js';

export const newProduct = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    if (req.file.filename) {
      product.productImage = req.file.filename
    }
    await product.save();
    res.json({ message: 'New product created' });
  } catch (error) {
    console.error(colors.red.bold('Error', error));
  }
};

export const showProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(colors.red.bold('Error', error));
  }
};

export const showProductbyId = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.json({ message: 'Product not found' });
      return next();
    }
    res.json(product);
  } catch (error) {
    console.error(colors.red.bold('Error', error));
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
      { new: true }
    );
    res.json({ message: 'Product updated', product });
  } catch (error) {
    console.error(colors.red.bold('Error', error));
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(colors.red.bold('Error', error));
  }
}