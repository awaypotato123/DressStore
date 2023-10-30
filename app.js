const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


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


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DressStore application.' });
});

const productController = require('./controllers/productController');


app.post('/products', productController.createProduct);


app.get('/products', productController.getProducts);


app.get('/products/:id', productController.getProductById);


app.put('/products/:id', productController.updateProductById);


app.delete('/products/:id', productController.removeProductById);


app.delete('/products', productController.removeAllProducts);


app.get('/products/search/:name', productController.findProductsByNameContains);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

