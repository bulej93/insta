const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const reviewsSchema = new mongoose.Schema({
    store:[{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'store'

    }],
  reviews:[String],
  
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
});





const Reviews = mongoose.model('reviews', reviewsSchema);

module.exports = Reviews;