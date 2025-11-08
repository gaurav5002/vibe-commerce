require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Models
const Product = require('./models/product');
const CartItem = require('./models/CartItem');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Body parser for JSON

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase(); // Seed the database after connection
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// --- Database Seeding ---
// REPLACE your old mockProducts array with this one
const mockProducts = [
  {
    name: 'Vibe T-Shirt',
    price: 24.99,
    imageUrl: 'https://picsum.photos/seed/tee/400/400',
  },
  {
    name: 'Vibe Hoodie',
    price: 49.99,
    imageUrl: 'https://picsum.photos/seed/hoodie/400/400',
  },
  {
    name: 'Vibe Cap',
    price: 19.99,
    imageUrl: 'https://picsum.photos/seed/cap/400/400',
  },
  {
    name: 'Vibe Sneakers',
    price: 89.99,
    imageUrl: 'https://picsum.photos/seed/sneakers/400/400',
  },
  {
    name: 'Vibe Water Bottle',
    price: 14.99,
    imageUrl: 'https://picsum.photos/seed/bottle/400/400',
  },
];

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    // Insert mock products
    await Product.insertMany(mockProducts);
    console.log('Database seeded with mock products');
    // Also clear the cart on server restart
    await CartItem.deleteMany({});
    console.log('Cart cleared');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

// --- API Routes ---

/**
 * GET /api/products
 * Fetches all products from the database.
 */
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

/**
 * GET /api/cart
 * Fetches all items in the cart and calculates the total.
 */
app.get('/api/cart', async (req, res) => {
  try {
    const items = await CartItem.find({});
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    res.json({ items, total: parseFloat(total.toFixed(2)) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
});

/**
 * POST /api/cart
 * Adds a new item to the cart.
 * If the item already exists, it increments its quantity.
 */
app.post('/api/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // 1. Find the product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Check if item is already in cart
    let cartItem = await CartItem.findOne({ productId: product._id });

    if (cartItem) {
      // 3a. If yes, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      // 3b. If no, create new cart item
      const newCartItem = new CartItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        imageUrl: product.imageUrl,
      });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err });
  }
});

/**
 * DELETE /api/cart/:id
 * Removes an item from the cart using its cart item ID (_id).
 */
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err });
  }
});

/**
 * POST /api/checkout
 * Mocks a checkout, clears the cart, and returns a receipt.
 */
app.post('/api/checkout', async (req, res) => {
  try {
    // In a real app, you'd process payment here
    const cartItems = await CartItem.find({});
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Create a mock receipt
    const receipt = {
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      timestamp: new Date(),
    };

    // Clear the cart
    await CartItem.deleteMany({});

    res.status(200).json(receipt);
  } catch (err) {
    res.status(500).json({ message: 'Error during checkout', error: err });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});