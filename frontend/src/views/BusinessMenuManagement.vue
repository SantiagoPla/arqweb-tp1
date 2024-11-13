<template>
  <div class="container">
    <h2 class="title"> Administrar Menú </h2>
    
    <!-- Lista de elementos en el menú -->
    <ul class="menu-list">
      <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
        <div class="menu-item-info">
          <strong class="menu-item-name">{{ item.name }}</strong>
          <p class="menu-item-description">{{ item.description }}</p>
        </div>
        <span class="menu-item-price">${{ item.price }}</span>
      </li>
    </ul>

    <!-- Botón para desplegar el formulario -->
    <button @click="toggleForm" v-if="!showForm" class="add-button">
      <i class="fas fa-plus-circle"></i>
    </button>

    <!-- Formulario para agregar elemento -->
    <form v-if="showForm" @submit.prevent="agregarElemento" class="form">
      <InputTextField 
          label="Nombre" 
          v-model="menuItem.name" 
          required />
      
      <InputTextField 
          label="Descripción" 
          v-model="menuItem.description" 
          required />
      
      <InputTextField 
          label="Precio" 
          type="number" 
          v-model="menuItem.price" 
          required />

      <button type="submit" class="submit-button">Agregar</button>
      <button @click="toggleForm" type="button" class="cancel-button">Cancelar</button>
    </form>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InputTextField from '../components/InputTextField.vue';
import { fetchRestaurantById } from '../services/restaurantService';


const route = useRoute();
const restaurantId = route.params.id;

// Llamar a la función fetchRestaurantById cuando el componente se monte
onMounted(async () => {
  try {
    console.log(restaurantId)
    const restaurantData = await fetchRestaurantById(restaurantId);
    console.log(restaurantData)
    menuItems.value = restaurantData.menuItems;
  } catch (error) {
    console.error('Error al cargar los datos del restaurante:', error);
  }
});


const menuItems = ref([]); 
const menuItem = ref({
  name: '',
  description: '',
  price: ''
});
const showForm = ref(false);

// Función para agregar el elemento al menú
const agregarElemento = () => {
  menuItems.value.push({ ...menuItem.value });
  menuItem.value = { name: '', description: '', price: '' };
  showForm.value = false;
};

// Función para mostrar u ocultar el formulario
const toggleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 20px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.title {
  margin: 10px;
  font-weight: bolder;
  font-family: 'Poppins', sans-serif;
  color: #2C3E50;
}

.add-button {
  padding: 10px 20px;
  background-color: #E67E22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 15%;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #F39C12;
}

.form {
  margin-top: 20px;
  display: grid;
  gap: 15px;
  justify-items: center;
  align-items: center;
  width: 100%;
  background-color: #e0d4c1; /* Fondo más oscuro */
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.submit-button {
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 30%;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2ecc71;
}

.cancel-button {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 30%;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #c0392b;
}

.menu-list {
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #faf1e6; /* Color de fondo similar al formulario */
  border: 2px solid #ddd;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.menu-item-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.menu-item-name {
  font-weight: bold;
  color: #2C3E50;
}

.menu-item-description {
  margin: 5px 0;
  color: #7f8c8d;
  font-size: 0.9em;
}

.menu-item-price {
  font-weight: bold;
  color: #4A90E2;
  font-size: 1.1em;
}
</style>
