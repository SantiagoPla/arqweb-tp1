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

      <div class="order-type">
        <button 
          @click="chooseOrderType('delivery')" 
          class="order-button"
        >
          Pedido a Domicilio
        </button>
        <button 
          @click="chooseOrderType('inRestaurant')" 
          class="order-button"
        >
          Comer en el Local
        </button>
      </div>

      <div v-if="orderType === 'delivery'">
        <label for="email">Ingresa tu Email para Delivery:</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="ejemplo@dominio.com"
        />
      </div>

      <div v-if="orderType === 'inRestaurant'">
        <label for="tableNumber">Número de Mesa:</label>
        <input 
          type="number" 
          id="tableNumber" 
          v-model="tableNumber" 
          placeholder="Número de mesa"
        />
      </div>

      <button 
        @click="realizarPedido" 
        class="order-button-confirm" 
        :disabled="cart.length === 0 || (orderType === 'delivery' && !email) || (orderType === 'inRestaurant' && !tableNumber)"
      >
        Hacer Pedido
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchRestaurantById, fetchMenuById, fetchLogoById, placeTableOrder, placeDeliveryOrder } from '../services/restaurantService';

  const restaurantLogo = ref(null);
  const restaurantName = ref('');
  const route = useRoute();
  const restaurantId = route.params.restaurantId;
  const menuItems = ref([]);
  const cart = ref({});
  const orderType = ref(null); 
  const email = ref('');
  const tableNumber = ref('');

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

  const chooseOrderType = (type) => {
    orderType.value = type;
  };

  const realizarPedido = async () => {
    const order = Object.keys(cart.value).reduce((order, productName) => {
      const [quantity, price] = cart.value[productName];
      order[productName] = [quantity, price];
      return order;
    }, {});

    try {
      if (orderType.value === 'delivery') {
        console.log(email.value)
        await placeDeliveryOrder(restaurantId, order, email.value); 
      } else if (orderType.value === 'inRestaurant') {
        await placeTableOrder(restaurantId, order, tableNumber.value); 
      } else {
        alert('Debe seleccionar una opción de entrega');
      }
      
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
    }
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

  .order-button-confirm {
    margin-top: 20px;
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 5px;
    width: 200px;
    max-width: 500px;
  }

  .order-button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }

  .order-type {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}

  .order-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 16px;  /* Ajuste de tamaño */
    font-size: 1.2rem;  /* Tamaño de fuente más pequeño */
    cursor: pointer;
    border-radius: 5px;
    width: 150px;  /* Ajuste de tamaño */
  }

  .order-button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }

  .order-type input {
    margin-top: 10px;
    padding: 8px;  /* Ajuste de padding */
    font-size: 1rem;
    width: 100%;
    max-width: 500px;
}

</style>
