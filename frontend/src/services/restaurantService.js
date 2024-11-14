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

//ORDER
export const fetchOrderStatus = async (pedidoId) => {
  try {
    const response = await axiosInstance.get('/user/order/', {
      params: {order_mongo_id: pedidoId }
    }
      
    );
    return response.data;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};
export const updateOrderStatus = async (restaurantId, pedidoId, pedidoStatus) => {
  try {
    const request_input = {status: pedidoStatus}
    const response = await axiosInstance.patch(`/order/order-status/${restaurantId}/${pedidoId}`, request_input);
    return response.data;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

export const placeTableOrder = async (restaurantId, order, tableId) => {
  try {
    const order_input = {"items": order, "table_id": tableId}
    const response = await axiosInstance.post(`/user/order/table-order/${restaurantId}`, order_input);
    return response.data;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

export const placeDeliveryOrder = async (restaurantId, order, email) => {
  try {
    const order_input = {"items": order, "email": email}
    const response = await axiosInstance.post(`/user/order/take-away-order/${restaurantId}`, order_input);
    return response.data;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};

const mapOrderItems = (order) => {
  const orderItems = Object.keys(order.items || {}).map(productName => {
    const [cant, price] = order.items[productName]; // Desestructuramos el array de items
    const userId = order.client_identifier?.email || order.client_identifier?.table_id || null;
    return {
      orderId: order.order_mongo_id,
      productName, // Nombre del producto
      type: order.type, // Tipo de pedido (TABLE/TAKE_AWAY)
      cant, // Cantidad
      price, // Precio
      totalPrice: order.total_price,
      userId: userId,
      status: order.status
    };
  });
  return orderItems[0]
};


export const fetchOrdersByRestaurantId = async (restaurantId) => {
  try {
    const response = await axiosInstance.get(`/order/${restaurantId}`);
    
    const orders = response.data.map(order => mapOrderItems(order));
    console.log(orders)
    return orders;

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};



//LOGO
export const addLogoToRestaurant = async (logoFile, restaurantId) => {
  try {
    const formData = new FormData();
    formData.append("input_logo", logoFile);

    console.log(formData)
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

// Obtener el logo de un restaurante
export const fetchLogoById = async (restaurantId) => {
  try {
    const response = await axiosInstance.get(`/logo/${restaurantId}`);
    const logoBase64 = `data:${response.data.content_type};base64,${response.data.data}`;
    return logoBase64;

  } catch (error) {
    console.error('Error fetching logo:', error);
    return null;
  }
};




//MENU
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

    const restaurantsWithLogos = await Promise.all(
      restaurants.map(async (restaurant) => {
        try {
          const logoBase64 = await fetchLogoById(restaurant.mongo_id);
          return {
            ...mapApiToRestaurant(restaurant),
            mongo_id: restaurant.mongo_id, // Asegúrate de incluir mongo_id
            logo: logoBase64 || null,
            hasLogo: !!logoBase64,
          };
        } catch (error) {
          return {
            ...mapApiToRestaurant(restaurant),
            mongo_id: restaurant.mongo_id, // Asegúrate de incluir mongo_id
            logo: null,
            hasLogo: false,
          };
        }
      })
    );

    return restaurantsWithLogos;
  } catch (error) {
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

