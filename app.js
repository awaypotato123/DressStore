const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (you need to replace 'your_mongodb_uri' with your actual MongoDB URI)
mongoose.connect("mongodb+srv://riyadhahmed324:GWyUo2z8Jpw6z6Es@cluster0.y3wnmpq.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a route to display the welcome message
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DressStore application.' });
});

const productController = require('./controllers/productController');

// Create a new product
app.post('/products', productController.createProduct);

// Get a list of all products
app.get('/products', productController.getProducts);

// Get a product by ID
app.get('/products/:id', productController.getProductById);

// Update a product by ID
app.put('/products/:id', productController.updateProductById);

// Delete a product by ID
app.delete('/products/:id', productController.removeProductById);

// Delete all products
app.delete('/products', productController.removeAllProducts);

// Get products with name containing "kw"
app.get('/products/search/:name', productController.findProductsByNameContains);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

