const mongoose = require('mongoose');

// Define the [Product Schema]
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number },
  numReviews: { type: Number },
});

// Export function to create the [Product Model] model class
module.exports = mongoose.model('Product', productSchema);
