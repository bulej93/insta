const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
  storeName: {
    type: String
  },
  reviews: {
    type: String
  }
});





const Store = mongoose.model('store', storeSchema);

module.exports = Store;