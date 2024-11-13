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


//LOGO
export const addLogoToRestaurant = async (logoFile, restaurantId) => {
  try {
    const formData = new FormData();
    formData.append("input_logo", logoFile);

    const response = await axiosInstance.post(`/logo/${restaurantId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    return response.data;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

//MENU
export const fetchMenuById = async (restaurantId) => {
  try {
    const response = await axiosInstance.get(`/menu/${restaurantId}`);
    
    const menuList = response.data;
    
    return menuList;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

export const addMenuItemToMenu = async (menuItem, restaurantId) => {
  try {
    const response = await axiosInstance.get(`/menu/${restaurantId}`, menuItem);
    
    const menuList = response.data;
    
    return menuList;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

//RESTAURANT
export const fetchRestaurantById = async (restaurantId) => {
  try {
    const response = await axiosInstance.get('/restaurant/list', {
      params: {
        restaurant_mongo_id: restaurantId
      }
    });
    
    const restaurant = response.data[0];
    
    return mapApiToRestaurant(restaurant);

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

export const fetchRestaurants = async () => {
  try {
    const response = await axiosInstance.get('/restaurant/list');
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
    const response = await axiosInstance.post('/restaurant/create', nonReactiveData);

    const restaurant_id = response.data;
    
    return restaurant_id;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

