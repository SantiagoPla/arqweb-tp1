<template>
    <div class="container">
      <!-- Barra de navegación -->
      <div class="navbar">
        <div v-if="restaurantLogo">
          <img :src="restaurantLogo" alt="Logo del Restaurante" class="restaurant-logo" />
        </div>
        <h2 v-if="restaurantName" class="restaurant-name">{{ restaurantName }}</h2>
        <h2 class="title"> - Estado del Pedido </h2>
      </div>
  
      <!-- Contenido principal -->
      <div class="main-content">
        <div v-if="orderStatus">
          <h3>Estado de la Orden: {{ orderStatus }}</h3>
          <p><strong>ID de la Orden:</strong> {{ orderId }}</p>
          <p><strong>Restaurante:</strong> {{ restaurantName }}</p>
          <p v-if="orderStatus === 'En preparación'">Tu pedido está siendo preparado.</p>
          <p v-if="orderStatus === 'En camino'">Tu pedido está en camino.</p>
          <p v-if="orderStatus === 'Entregado'">Tu pedido ha sido entregado.</p>
        </div>
        <div v-else>
          <p>Cargando estado de la orden...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { fetchRestaurantById, fetchLogoById, fetchOrderStatus } from '../services/restaurantService';
  
    const route = useRoute();
    const restaurantId = route.params.restaurantId;
    const orderId = route.params.orderId;
    const restaurantLogo = ref(null);
    const restaurantName = ref('');
    const orderStatus = ref('');
  
    onMounted(async () => {
      try {
        const orderData = await fetchOrderStatus(restaurantId, orderId);
        orderStatus.value = orderData.status;
        const restaurantData = await fetchRestaurantById(restaurantId);
        restaurantName.value = restaurantData.name;
        restaurantLogo.value = await fetchLogoById(restaurantId);
      } catch (error) {
        console.error('Error al cargar el estado de la orden:', error);
      }
    });
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
      padding: 10px 20px;
    }
  
    .restaurant-logo {
      max-width: 100px;
      height: auto;
      margin-right: 5px;
    }
  
    .restaurant-name {
      font-size: 2rem;
      font-weight: bold;
      color: #2C3E50;
      margin-left: 5px;
    }
  
    .title {
      font-size: 1.5rem;
      font-weight: bolder;
      color: #2C3E50;
    }
  
    .main-content {
      margin-top: 80px;
      padding: 20px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #2C3E50;
    }
  
    p {
      font-size: 1rem;
      color: #333;
    }
  </style>
  