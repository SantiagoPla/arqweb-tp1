import axiosInstance from '../config/axios.js';

export const fetchOrderStatus = async (pedidoId) => {
    try {
      console.log(pedidoId)
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
      const [cant, price] = order.items[productName]; 
      const userId = order.client_identifier?.email || order.client_identifier?.table_id || null;
      return {
        orderId: order.order_mongo_id,
        productName,
        type: order.type, 
        cant,
        price, 
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