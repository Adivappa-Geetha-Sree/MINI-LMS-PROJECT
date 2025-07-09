const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  sector: String,
  description: String,
  price: Number,
  duration: String,
  timing: String,
  status: String,
  mainImage: String,
  classImages: [String],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
