const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  descripcion: {
    type: String,
    required: false,
  },

  precio: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
