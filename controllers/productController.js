const Product = require('../models/product'); // Import the product model



// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not create the product' });
  }
};

// Get a list of all products
exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find({}, 'name description price quantity');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch products' });
    }
  };
  

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the product' });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Could not update the product' });
  }
};

// Remove a product by ID
exports.removeProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the product' });
  }
};

// Remove all products
exports.removeAllProducts = async (req, res) => {
  try {
    const deletedProducts = await Product.deleteMany({});
    res.json(deletedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete all products' });
  }
};

// Find all published products (if you have a "published" field)
exports.findPublishedProducts = async (req, res) => {
  try {
    const publishedProducts = await Product.find({ published: true });
    res.json(publishedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch published products' });
  }
};

// Find all products whose name contains a keyword (case-insensitive)
exports.findProductsByNameContains = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const products = await Product.find({
      name: { $regex: new RegExp(keyword, 'i') },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch products by keyword' });
  }
};


