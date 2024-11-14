<template>
    <div class="container">
      <div class="navbar">
        <div v-if="restaurantLogo">
          <img :src="restaurantLogo" alt="Logo del Restaurante" class="restaurant-logo" />
        </div>
  
        <h2 v-if="restaurantName" class="restaurant-name">{{ restaurantName }}</h2>
  
        <h2 class="title"> Ver Menú </h2>
      </div>
  
      <div class="main-content">
        <ul class="menu-list">
          <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
            <div class="menu-item-info">
              <strong class="menu-item-name">{{ item.name }}</strong>
              <p class="menu-item-description">{{ item.description }}</p>
            </div>
  
            <span class="menu-item-price">${{ item.price }}</span>
  
            <div class="quantity-controls">
              <button 
                @click="adjustQuantity(item, -1)" 
                class="quantity-button" 
                :disabled="getItemQuantity(item) <= 0"
              >-</button>
  
              <span class="quantity-display">{{ getItemQuantity(item) }}</span>
  
              <button 
                @click="adjustQuantity(item, 1)" 
                class="quantity-button"
              >+</button>
            </div>
          </li>
        </ul>
  
        <button 
          @click="realizarPedido" 
          class="order-button" 
          :disabled="cart.length === 0"
        >
          Hacer Pedido
        </button>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchRestaurantById, fetchMenuById, fetchLogoById, placeTableOrder } from '../services/restaurantService';

  const restaurantLogo = ref(null);
  const restaurantName = ref('');
  const route = useRoute();
  const restaurantId = route.params.restaurantId;
  const tableId = route.params.tableId;
  const menuItems = ref([]);
  const cart = ref({});  

  onMounted(async () => {
    try {
      const restaurantData = await fetchRestaurantById(restaurantId);
      restaurantName.value = restaurantData.name;

      restaurantLogo.value = await fetchLogoById(restaurantId);
      menuItems.value = await fetchMenuById(restaurantId);
    } catch (error) {
      console.error('Error al cargar los datos del restaurante:', error);
    }
  });

  const adjustQuantity = (item, amount) => {
    const itemInCart = cart.value[item.name];

    if (itemInCart) {
      itemInCart[0] += amount;  

      if (itemInCart[0] <= 0) {
        delete cart.value[item.name];  
      }
    } else if (amount > 0) {
      cart.value[item.name] = [amount, item.price];  
    }
  };

  const getItemQuantity = (item) => {
    const itemInCart = cart.value[item.name];
    return itemInCart ? itemInCart[0] : 0;
  };

  const realizarPedido = () => {
      const order = Object.keys(cart.value).reduce((order, productName) => {
        const [quantity, price] = cart.value[productName];
        order[productName] = [quantity, price];
        return order;
    }, {});


    const idPedido = placeTableOrder(restaurantId, order, tableId);
    return 
  };
</script>

  
<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }
  
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #e5d7c7;
        color: white;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
  
    .restaurant-logo {
        max-width: 100px;
        height: auto;
        margin-right: 5px;
        margin-left: 10px;
    }
  
    .restaurant-name {
        font-size: 2rem;
        font-weight: bold;
        margin-left: 5px;
        color: #2C3E50;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        letter-spacing: 1px;
        text-transform: uppercase;
        font-family: 'Poppins', sans-serif;
    }
  
    .title {
        font-size: 1.5rem;
        font-weight: bolder;
        font-family: 'Poppins', sans-serif;
        color: #2C3E50;
        margin-left: auto;
        margin-right: 10px;
    }
  
    .main-content {
      margin-top: 80px;
      padding: 20px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
  
    .menu-list {
      list-style-type: none;
      padding: 0;
      width: 500px;
      max-width: 1200px;
    }
  
    .menu-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      width: 100%;
      max-width: 1200px;
      height: 80px;
      box-sizing: border-box;
      align-items: center;
    }
  
    .menu-item-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 80%;
      overflow: hidden;
    }
  
    .menu-item-name,
    .menu-item-description {
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  
    .menu-item-price {
      font-size: 1.2rem;
      color: #333;
      flex-shrink: 0;
      margin-right: 10px;
    }
  
    .quantity-button {
      background-color: #E67E22;
      color: white;
      border: none;
      padding: 5px 10px;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 5px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .quantity-controls {
      display: flex;
      align-items: center;
    }
  
    .quantity-display {
      margin: 0 10px;
      font-size: 1.2rem;
      color: #333;
    }
  
    .order-button {
      margin-top: 20px;
      background-color: #28a745;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 1.5rem;
      cursor: pointer;
      border-radius: 5px;
    }
  
    .order-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
</style>
  