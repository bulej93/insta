const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter Store name'],
  },
  reviews: {
    type: String
  }
});





const Store = mongoose.model('store', storeSchema);

module.exports = Store;