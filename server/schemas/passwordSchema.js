const mongoose = require("mongoose");

const { Schema } = mongoose;

const passwordSchema = new Schema({
  siteUrl: { type: String, required: true }, // Required field
  actualPassword: { type: String, required: true }, // Required field
  siteName: { type: String, required: true }, // Required field
  userName: { type: String } // Not required
});

module.exports = mongoose.model("passwords", passwordSchema);
