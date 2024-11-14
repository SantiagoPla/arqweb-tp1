<template>
  <div class="container">
    <!-- Navbar -->
    <div class="navbar">
      <div v-if="restaurantLogo">
        <img :src="restaurantLogo" alt="Logo del Restaurante" class="restaurant-logo" />
      </div>

      <h2 v-if="restaurantName" class="restaurant-name">{{ restaurantName }}</h2>

      <h2 class="title"> - Gestionar Pedidos </h2>

      <button @click="goToMenuManagement" class="orders-button">
        Gestionar Menú
      </button>
    </div>

    <div class="main-content">
      <h1>Lista de Pedidos</h1>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Precio Total</th>
            <th>Tipo</th>
            <th>Mesa</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pedido, index) in pedidos" :key="pedido.numero">
            <td>{{ index + 1 }}</td>
            <td>{{ pedido.productName }}</td>
            <td>{{ pedido.cant }}</td>
            <td>{{ pedido.price }}</td>
            <td>{{ pedido.totalPrice }}</td>
            <td>{{ pedido.type }}</td>
            <td>{{ pedido.userId }}</td>
            <td>
              <select v-model="pedido.status" class="estado-select" @change="handleStatusUpdate(pedido.orderId, pedido.status)">
                <option value="PENDING">Pendiente</option>
                <option value="PREPARING">Preparando</option>
                <option value="READY">Listo</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchRestaurantById, fetchLogoById, fetchOrdersByRestaurantId, updateOrderStatus } from '../services/restaurantService';

const route = useRoute();
const restaurantLogo = ref(null);
const restaurantName = ref('');
const restaurantId = route.params.id;
const pedidos = ref([]);

onMounted(async () => {
  try {
    const restaurantData = await fetchRestaurantById(restaurantId);
    restaurantName.value = restaurantData.name;
    restaurantLogo.value = await fetchLogoById(restaurantId);
    pedidos.value = await fetchOrdersByRestaurantId(restaurantId);
  } catch (error) {
    console.error('Error al cargar los datos del restaurante:', error);
  }
});

const handleStatusUpdate = async (pedidoId, pedidoStatus) => {
  try {
    await updateOrderStatus(restaurantId, pedidoId, pedidoStatus);
    console.log(`Estado del pedido ${pedidoId} actualizado a ${pedidoStatus}`);
  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
  }
};

const goToMenuManagement = () => {
  router.push(`/business/restaurant/${restaurantId}/`);
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

.orders-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: auto;
  margin-right: 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
}

.orders-button:hover {
  background-color: #2980b9;
}

.main-content {
  margin-top: 80px;
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.orders-table {
  width: 100%;
  table-layout: auto;
  margin-top: 20px;
}

.orders-table th, .orders-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #555;
}

.orders-table th {
  background-color: #e5d7c7;
  color: #2C3E50;
  width: 16.66%;
}

.orders-table td {
  word-wrap: break-word;
}

.orders-table tr:hover {
  background-color: #f1e9e0;
}

.estado-select {
  background-color: #e5d7c7;
  color: #2C3E50;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  max-width: 100%;
}

.estado-select option {
  background-color: #faf1e6;
  color: #2C3E50;
}
</style>
