const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  id:Number,
  name: String,
  cuisine: String,
  address: String,
  city: String,
  rating: { type: Number, default: 0 },
  menu: [
    {
      name: String,
      price: Number,
      description: String,
      isVeg: Boolean,
      averageRating: { type: Number, default: 0 },
    },
  ],
  reviews: [
    {
      rating: Number,
      reviewText: String,
    },
  ],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
