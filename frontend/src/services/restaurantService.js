import axiosInstance from '../config/axios.js';
import Restaurant from '../models/Restaurant.js';

const mapApiToRestaurant = (apiRestaurant) => {
  const restaurant = Restaurant();
  restaurant.id = apiRestaurant.mongo_id;
  restaurant.name = apiRestaurant.name;
  
  restaurant.longitude = apiRestaurant.longitude;
  restaurant.latitude = apiRestaurant.latitude;
  restaurant.address = apiRestaurant.address;

  restaurant.phoneNumber = apiRestaurant.phone_number;
  restaurant.email = apiRestaurant.email 
  restaurant.instagram = apiRestaurant.instagram

  restaurant.openingTime = apiRestaurant.opening_time;
  restaurant.closingTime = apiRestaurant.closing_time;

  return restaurant
}

export const fetchRestaurants = async () => {
  try {
    const response = await axiosInstance.get('/external/restaurant/list');
    const restaurants = response.data;

    return restaurants.map(mapApiToRestaurant);

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};
