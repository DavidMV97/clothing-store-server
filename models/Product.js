import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  value: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  description: {
    type: String,
    trim: true,
  },
  productImage: {
    type: String,
  },
});

const Product = model('Products', productsSchema);

export default Product;
