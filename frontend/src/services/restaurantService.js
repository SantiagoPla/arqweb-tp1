import axiosInstance from '../config/axios.js';

export const fetchRestaurants = async () => {
  try {
    const response = await axiosInstance.get('/external/restaurant/list');
    const restaurants = response.data;

    return restaurants.map((restaurant) => ({
        name: restaurant.name,
        instagram: restaurant.instagram,
        address: restaurant.address,
        phone_number: restaurant.phone_number,
        timetable: restaurant.timetable, //TO DO ! ! ! 
        location: [restaurant.longitude, restaurant.latitude],
    }));

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};
