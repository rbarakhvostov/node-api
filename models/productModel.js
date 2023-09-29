const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"]
    },
    quantity: {
      type: Number,
      required: [true, "Please enter a quantity of product"],
      default: 0
    },
    price: {
      type: Number,
      required: [true, "Please enter a product price"],
    },
    price: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true
  }
)

const ProductModel = mongoose.model('Product', productSchema)


module.exports = ProductModel
