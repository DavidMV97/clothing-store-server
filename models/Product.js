import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  productImage: {
    type: String,
  },
});

const Product = model('Products', productsSchema);

export default Product;
