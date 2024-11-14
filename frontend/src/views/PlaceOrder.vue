<template>
  <div class="container">
    <div class="navbar">
      <div v-if="restaurantLogo">
        <img :src="restaurantLogo" alt="Logo del Restaurante" class="restaurant-logo" />
      </div>

      <h2 v-if="restaurantName" class="restaurant-name">{{ restaurantName }}</h2>

      <h2 class="title"> - Hacer pedido </h2>
    </div>



    <div class="restaurant-info" style="margin-top: 60px">
          <a :href="`https://web.whatsapp.com/send?phone=${restaurantPhone}&text=Hola%20${encodeURIComponent(restaurantName)}!%20Quería%20consultar%20sobre%20`" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-whatsapp" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
          </a>
          <div>
              <p><strong>Dirección:</strong> {{ restaurantAdress }}</p>
              <p><strong>Teléfono:</strong> {{ restaurantPhone }}</p>
              <p><strong>Email:</strong> {{ restaurantEmail }}</p>
              <p><strong>Instagram:</strong> <a :href="`https://instagram.com/${restaurantInstagram}`" target="_blank">{{ restaurantInstagram }}</a></p>
              <p><strong>Horarios:</strong> {{ restaurantOpen + ' - ' + restaurantClose }}</p>
          </div>
           <a :href="`https://www.instagram.com/${restaurantInstagram}`" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg"width="100" height="100" fill="violet"  class="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
          </a>
      </div>

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

    <div class="main-content">
      <table class="menu-table">
        <thead>
          <tr>
            <th>Plato</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(item, index) in menuItems" 
            :key="index" 
            class="menu-item-row" 
            @mouseover="hover = index" 
            @mouseleave="hover = null"
            :class="{ 'hovered': hover === index }"
          >
            <td class="menu-item-name">{{ item.name }}</td>
            <td class="menu-item-description">{{ item.description }}</td>
            <td class="menu-item-price">${{ item.price }}</td>
            <td class="quantity-controls">
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
            </td>
          </tr>
        </tbody>
      </table>

  
    <p style="font-size: 20px">Total: ${{ total() }}</p>
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
  import { useRoute, useRouter } from 'vue-router';
  import { fetchRestaurantById, fetchMenuById, fetchLogoById, placeTableOrder, placeDeliveryOrder } from '../services/restaurantService';

  const restaurantLogo = ref(null);
  const restaurantName = ref('');
  const restaurantPhone = ref('');
  const restaurantAdress = ref('');
  const restaurantEmail = ref('');
  const restaurantOpen = ref('');
  const restaurantInstagram = ref('');
  const restaurantClose = ref('');

  const route = useRoute();
  const router = useRouter();
  const restaurantId = route.params.restaurantId;
  const menuItems = ref([]);
  const cart = ref({});
  const orderType = ref(null); 
  const email = ref('');
  const tableNumber = ref('');


 // Código actualizado sin computed
    const total = () => {
      if (!cart.value) return 0;
      return Object.values(cart.value).reduce((acc, [quantity, price]) => acc + quantity * price, 0);
    };


  onMounted(async () => {
    
    try {
      const restaurantData = await fetchRestaurantById(restaurantId);
      console.log('dataaa', restaurantData)
      restaurantName.value = restaurantData.name;
      restaurantAdress.value = restaurantData.address;
      restaurantPhone.value = restaurantData.phone_number;
      restaurantEmail.value = restaurantData.email;
      restaurantInstagram.value = restaurantData.instagram;
      restaurantOpen.value = restaurantData.opening_time;
      restaurantClose.value = restaurantData.closing_time;


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
      let orderId;

      if (orderType.value === 'delivery') {
        console.log(email.value)
        orderId = await placeDeliveryOrder(restaurantId, order, email.value); 
      } else if (orderType.value === 'inRestaurant') {
        orderId = await placeTableOrder(restaurantId, order, tableNumber.value); 
      } else {
        alert('Debe seleccionar una opción de entrega');
        return
      }
      router.push(`/restaurant/${restaurantId}/order/${orderId}`);

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
  }

  .main-content {
    margin-top: 20px;
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
.menu-table {
  width: 1500px;
  border-collapse: collapse;
  margin-top: 20px;
}

.menu-table th,
.menu-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.menu-table th {
  background-color: #f3f3f3;
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
}

.menu-item-row {
  transition: transform 0.2s, box-shadow 0.2s;
}

.menu-item-row.hovered {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
}

.menu-item-name {
  font-weight: bold;
}

.menu-item-description {
  color: #666;
  font-size: 0.9rem;
}

.menu-item-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-button {
  background-color: #E67E22;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.quantity-display {
  margin: 0 10px;
  font-size: 1rem;
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
    margin-top: 50px;
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

.restaurant-info {
  margin-top: 60px;display: flex;width: 1400px;justify-content: space-between;
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    max-width: 100%;
    text-align: left;
  }

  .restaurant-info h3 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .restaurant-info p {
    font-size: 1rem;
    margin: 5px 0;
  }

  .restaurant-info a {
    color: #3498db;
    text-decoration: none;
  }

  .restaurant-info a:hover {
    text-decoration: underline;
  }

</style>