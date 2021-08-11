const router = require('express').Router();
const { multerMiddleware } = require('../utils/imageUpload');
const productController = require('../controllers/products');
const {
  createProductValidator,
  editProductValidator,
  validate,
} = require('../utils/validators/products');

router.get('/', productController.getAllProducts);
router.post(
  '/create',
  multerMiddleware,
  createProductValidator(),
  validate,
  productController.createProduct,
);

router.get('/:slug', productController.getProduct);
router.patch(
  '/edit/:slug',
  editProductValidator(),
  validate,
  productController.editProduct,
);
router.patch('/delete/:slug', productController.deleteProduct);

module.exports = router;
