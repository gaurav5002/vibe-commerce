const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  imageUrl: { type: String, required: true },
});

// Use 'CartItem' as the model name. Mongoose will create a 'cartitems' collection.
module.exports = mongoose.model('CartItem', cartItemSchema);