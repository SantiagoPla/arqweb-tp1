import axiosInstance from '../config/axios.js';
import Restaurant from '../models/Restaurant.js';

const mapApiToRestaurant = (apiRestaurant) => {
  const restaurant = Restaurant();
  restaurant.name = apiRestaurant.name;
  
  restaurant.longitude = apiRestaurant.longitude;
  restaurant.latitude = apiRestaurant.latitude;
  restaurant.address = apiRestaurant.address;

  restaurant.phone_number = apiRestaurant.phone_number;
  restaurant.email = apiRestaurant.email 
  restaurant.instagram = apiRestaurant.instagram

  restaurant.opening_time = apiRestaurant.opening_time;
  restaurant.closing_time = apiRestaurant.closing_time;

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

export const createRestaurant = async (restaurantData) => {
  try {
    const nonReactiveData = JSON.parse(JSON.stringify(restaurantData.value));
    console.log(nonReactiveData)
    const restaurant_id = await axiosInstance.post('/external/restaurant/create', nonReactiveData);

    return restaurant_id;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

