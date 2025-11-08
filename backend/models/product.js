const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

// Use 'Product' as the model name. Mongoose will create a 'products' collection.
module.exports = mongoose.model('Product', productSchema);