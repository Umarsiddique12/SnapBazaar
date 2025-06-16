const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  sellerName: { type: String, required: true },           // new field for seller's name
  whatsappNumber: { type: String, required: true },       // new field for WhatsApp number in international format without '+' (e.g. 919876543210)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', ItemSchema);
