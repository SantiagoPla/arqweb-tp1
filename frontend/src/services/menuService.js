import axiosInstance from '../config/axios.js';

export const fetchMenuById = async (restaurantId) => {
  try {
    const response = await axiosInstance.get(`/menu/${restaurantId}`);
    
    const menuList = response.data;
    console.log(menuList)
    return menuList;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

export const addMenuItemToMenu = async (menuItem, restaurantId) => {
  try {
    const response = await axiosInstance.post(`/menu/${restaurantId}`, menuItem);
    
    const menuId = response.data;
    
    return menuId;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

export const deleteMenuItem = async (menuItemName, restaurantId) => {
  try {
    const response = await axiosInstance.delete(`/menu/${restaurantId}`, {
      data: {"menu_item_name": menuItemName}
    });
    
    const menuId = response.data;
    
    return menuId;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};


