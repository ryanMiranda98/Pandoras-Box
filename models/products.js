/* eslint-disable func-names */
const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    slug: { type: String, trim: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true, min: 0.5 },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true }, // FK
    description: { type: String, required: true },
    reviews: { type: String }, // FK
    images: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Create virtual property for boolean inStock
productSchema.virtual('inStock').get(function () {
  return this.stockQuantity > 0;
});

// Pre-save hook for slugify-ing the product title on save and create
productSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();

  const slug = slugify(this.title, { lower: true, trim: true, remove: /[()]/g });
  this.slug = slug;
  return next();
});

// Pre-update hook for slugify-ing the product title on findOneAndUpdate
productSchema.pre('findOneAndUpdate', function (next) {
  const { title } = this.getUpdate();

  if (title === undefined) return next();

  const slug = slugify(title, { lower: true, trim: true, remove: /[()]/g });
  this.findOneAndUpdate({}, { $set: { slug } });
  return next();
});

module.exports = mongoose.model('Product', productSchema);
