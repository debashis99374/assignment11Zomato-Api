const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  getRestaurantByName,
  getAllRestaurants,
  getRestaurantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByLocation,
  filterRestaurantsByRating,
  addDishToMenu,
  removeDishFromMenu,
  addReviewAndRating,
  getReviewsForRestaurant,
} = require('./resturantControllers');


router.post('/restaurants', createRestaurant);
router.get('/restaurants/search', searchRestaurantsByLocation);
router.get('/restaurants/:name', getRestaurantByName);
router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/cuisine/:cuisineType',getRestaurantsByCuisine);
router.post('/restaurants/:restaurantId',updateRestaurant);
router.delete('/restaurants/:restaurantId', deleteRestaurant);

router.get('/restaurants/rating/:minRating',filterRestaurantsByRating);

router.post('/restaurants/:restaurantId/menu', addDishToMenu);
router.delete('/restaurants/:restaurantId/menu/:menuItemName', removeDishFromMenu);

router.post('/restaurants/:restaurantId/reviews', addReviewAndRating);
router.get('/restaurants/:restaurantId/reviews', getReviewsForRestaurant);


module.exports = router;
