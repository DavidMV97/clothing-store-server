
import Product from '../models/Product.js';

export const newProduct = async (req, res, next) => {
  const product = new Product(req.body);

  try {
    if (req.body.filename) {
        product.image = req.file.filename
    }
    await product.save();
    res.json({ message: 'New product created' });
  } catch (error) {
    console.error(colors.red.bold('Error', error));
  }
};
