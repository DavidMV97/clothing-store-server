import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Product name is required']
  },
  category: {
    type: String,
    trim: true,
    enum: ['Casual', 'Formal', 'Sporty', 'Urban', 'Elegant', 'Vintage'],
    required: [true, 'Category is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
    min: [0, 'Value cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required']
  },
  productImage: {
    type: String,
    required: [true, 'Product image is required']
  },
}, {
  timestamps: { createdAt: 'creationDate', updatedAt: 'updatedAt' }
});

const Product = model('Products', productsSchema);

export default Product;
