const express = require('express')
const Restaurant=require('../model/resturantModel')
const mongoose=require('mongoose')


const createRestaurant = async (req, res) => {
  try {
    const restaurantData = req.body;
    
    const restaurant = new Restaurant(restaurantData);
    const savedRestaurant = await restaurant.save();
    if(!savedRestaurant){
      res.status(404).json({error:"sorry resturant not added"});
    }
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create restaurant', message: error.message });
  }
};


const getRestaurantByName = async (req, res) => {
  const resturantName=req.params.name
  const restaurant=await Restaurant.findOne({name:resturantName})
  if(!restaurant){
    res.status(404).json({error:"Resturant not found"})
  }
  res.status(200).json({message:"resturant found",restaurant})
};
const getAllRestaurants = async (req, res) => {
  try {
    const allRestaurants=await Restaurant.find({})
    if(!allRestaurants){
      res.status(404).json({error:"All resturant not found"})
    }else{
      res.status(200).json(allRestaurants)
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all restaurants', message: error.message });
  }
};

const getRestaurantsByCuisine = async (req, res) => {
  try {
    const cusineType=req.params.cuisineType
    const restaurant=await Restaurant.find({cuisine:cusineType})
    if(restaurant){
      res.status(200).json({message:"found",restaurant})
    }
    res.status(404).json({message:`Resturant who servs ${cusineType} food isnt available`})
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to get restaurants by cuisine', message: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const resturantId=req.params.restaurantId
    const dataToBeUpdated=req.body
    const updateResturant=await Restaurant.findByIdAndUpdate(resturantId,dataToBeUpdated,{
       new: true
    })
    if(updateResturant){
      res.status(200).json({message:"updated resturant",updateResturant})
    }else{
      res.status(404).json({error:"Failed"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update restaurant', message: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const resturantId=req.params.restaurantId
    const resturantToBeDeleted=await Restaurant.findByIdAndDelete(resturantId)
    if(!resturantToBeDeleted){
      res.status(404).json({message:"Restaurant not found"})
    }
    res.status(200).json({message:"resturant deleted"})
  
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete restaurant', message: error.message });
  }
};

const searchRestaurantsByLocation = async (req, res) => {
  try {
    const {city,address}=req.query
    let restaurant=await Restaurant.find({})

    if (city) {
  restaurant = restaurant.filter((el) => el.city && el.city.toLowerCase() === city.toLowerCase());
}

if (address) {
  restaurant = restaurant.filter((el) => el.address && el.address.toLowerCase() === address.toLowerCase());
}
    if(restaurant.length===0){
       res.status(404).json({ error: 'Zero restuarant in this area' });
    }
    res.status(200).json({message:"Resturants near you:",restaurant})
    
    
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to search for restaurants', message: error.message });
  }
};

const filterRestaurantsByRating = async (req, res) => {
  try {
    const minRating = parseFloat(req.params.minRating);

    
    const restaurants = await Restaurant.find({ rating: { $gte: minRating } });


    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter restaurants by rating', message: error.message });
  }
};

const addDishToMenu = async (req, res) => {
  try {
   const restaurantId = req.params.restaurantId;
    const newDish = req.body;

    
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    
    restaurant.menu.push(newDish);

    
    await restaurant.save();

    res.status(201).json({ message: 'Dish added to menu', restaurant });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add dish to menu', message: error.message });
  }
};

const removeDishFromMenu = async (req, res) => {
  try {
    const restaurantId=req.params.restaurantId
    const menuItemName=req.params.menuItemName
    const restaurant=await Restaurant.findById(restaurantId)
    if(!restaurant){
       res.status(404).json({ error: 'Restaurant not found' });
    }
    const menuIndex=restaurant.menu.findIndex((el)=>el.name===menuItemName)
     restaurant.menu.splice(menuIndex,1)
    
    await restaurant.save()
    res.status(200).json({message:"Dish removed from menu",restaurant})
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove dish from menu', message: error.message });
  }
};

const addReviewAndRating = async (req, res) => {
  try {
    const restaurantId=req.params.restaurantId
    const customReviews=req.body
    const restaurant=await Restaurant.findById(restaurantId)
    if(!restaurant){
      res.status(404).json({message:"Restaurant not found"})
    }
     restaurant.reviews.push(customReviews) 
    
    const accumulatedRating=restaurant.reviews.reduce((a,b)=>(a+b.rating),0)
    restaurant.rating = parseFloat(accumulatedRating);
    await restaurant.save()

    res.status(200).json({message:"Ratings and review added succesfully",restaurant})
    
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review and rating', message: error.message });
  }
};

const getReviewsForRestaurant = async (req, res) => {
  try {
    const restaurantId=req.params.restaurantId
    const restaurant=await Restaurant.findById(restaurantId)
    if(!restaurant){
      res.status(404).json({message:"Restaurant not found"})
    }
    if(restaurant.reviews.length===0){
      res.status(404).json({message:"No reviews yet for the restaurant"})
    }else{
      const resReview=restaurant.reviews
      res.status(200).json({message:"All the reviews for the restaurant",resReview})
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reviews for restaurant', message: error.message });
  }
};



module.exports = {
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
};
