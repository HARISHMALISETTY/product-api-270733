const express = require('express');
const app = express();

app.use(express.json());

/**
 * In-memory store for products.
 * @type {Array<{id: number, name: string, price: number}>}
 */
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
  { id: 3, name: 'Headphones', price: 149.99 },
];

/**
 * GET /products
 * Returns a list of all products.
 * @returns {Array} List of products.
 */
app.get('/products', async (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * POST /products
 * Adds a new product to the store.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;

    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name must be a non-empty string' });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
