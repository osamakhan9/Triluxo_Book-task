const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number,
  },
  {
    versionkey: false,
  }
);
const bookModel = mongoose.model("book", bookSchema);
module.exports = {
  bookModel,
};
