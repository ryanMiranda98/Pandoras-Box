const Product = require('../models/products');
const { upload } = require('../utils/imageUpload');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(200).json({
        message: 'No products found in database',
        data: {
          products: [],
        },
      });
      return;
    }

    res.status(200).json({
      message: 'Products found',
      data: {
        count: products.length,
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title, weight, price, stockQuantity, category, description,
    } = req.body;

    const { path, originalname, mimetype } = req.file;

    const product = await Product.findOne({ title });
    if (product) {
      throw new Error(
        'Product already exists. Please update product quantity instead!',
      );
    }

    const newProduct = new Product({
      title,
      weight,
      price,
      stockQuantity,
      category,
      description,
    });

    const imageUrl = await upload(path, originalname, mimetype);

    newProduct.images = imageUrl;
    await newProduct.save();

    res.status(201).json({
      message: 'Product created',
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      throw new Error('Product does not exist');
    }

    res.status(200).json({
      message: 'Product found',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      throw new Error('Product does not exist');
    }

    const updatedProduct = await Product.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });

    res.status(200).json({
      message: `Product ID ${updatedProduct.id}: ${updatedProduct.title} updated`,
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      throw new Error('Product does not exist');
    }

    const deletedProduct = await Product.findOneAndDelete({ slug });

    res.status(200).json({
      message: `Product ID ${deletedProduct.id}: ${deletedProduct.title} deleted`,
      data: {
        product: deletedProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
