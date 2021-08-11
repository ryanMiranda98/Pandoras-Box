const { body, validationResult } = require('express-validator');

exports.createProductValidator = () => [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title cannot be null')
    .isString()
    .isLength({ max: 255 })
    .withMessage('Title cannot exceed 255 characters'),
  body('weight').isFloat().not().isEmpty()
    .withMessage('Weight cannot be null'),
  body('price')
    .not()
    .isEmpty()
    .withMessage('Price cannot be null')
    .isFloat({ gt: 0.5 })
    .withMessage('Price cannot be less than 0.5'),
  body('stockQuantity')
    .isFloat()
    .not()
    .isEmpty()
    .withMessage('Stock Quantity cannot be null'),
  body('category')
    .not()
    .isEmpty()
    .withMessage('Category cannot be null')
    .isString(),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Description cannot be null')
    .isString(),
];

exports.editProductValidator = () => [
  body('title')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ max: 255 })
    .withMessage('Title cannot exceed 255 characters'),
  body('slug').optional({ checkFalsy: true }).isString(),
  body('weight').optional({ checkFalsy: true }).isFloat(),
  body('price')
    .optional({ checkFalsy: true })
    .isFloat({ gt: 0.5 })
    .withMessage('Price cannot be less than 0.5'),
  body('stockQuantity').optional({ checkFalsy: true }).isFloat(),
  body('category').optional({ checkFalsy: true }).isString(),
  body('description').optional({ checkFalsy: true }).isString(),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
