<template>
  <div class="container">
    
    <div class="navbar">
      <div v-if="restaurantLogo">
      <img :src="restaurantLogo" alt="Logo del Restaurante" class="restaurant-logo" />
      </div>

      <h2 class="title"> Administrar Menú </h2>
    </div>

    
    <div class="main-content">
      <ul class="menu-list">
        <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
          <div class="menu-item-info">
            <strong class="menu-item-name">{{ item.name }}</strong>
            <p class="menu-item-description">{{ item.description }}</p>
          </div>
          <span class="menu-item-price">${{ item.price }}</span>
        </li>
      </ul>

      <button @click="toggleForm" v-if="!showForm" class="add-button">
        <i class="fas fa-plus-circle"></i>
      </button>

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

        <div class="submit-container"> 
          <button type="submit" class="submit-button">Agregar</button>
          <button @click="toggleForm" type="button" class="cancel-button">Cancelar</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InputTextField from '../components/InputTextField.vue';
import { fetchRestaurantById, fetchMenuById, fetchLogoById} from '../services/restaurantService';

const restaurantLogo = ref(null);

const route = useRoute();
const restaurantId = route.params.id;
const menuItems = ref([]); 
const menuItem = ref({
  name: '',
  description: '',
  price: ''
});
const showForm = ref(false);

onMounted(async () => {
  try {
    console.log(restaurantId)
    const restaurantData = await fetchRestaurantById(restaurantId);
    restaurantLogo.value = await fetchLogoById(restaurantId);
    menuItems.value = await fetchMenuById(restaurantId);
  } catch (error) {
    console.error('Error al cargar los datos del restaurante:', error);
  }
});




const agregarElemento = () => {
  menuItems.value.push({ ...menuItem.value });
  menuItem.value = { name: '', description: '', price: '' };
  showForm.value = false;
};

const toggleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<style scoped>
/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 15px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.restaurant-logo {
  max-width: 50px;
  height: auto;
}

.title {
  margin-left: 20px;
  font-size: 1.5rem;
}

/* Main content */
.main-content {
  margin-top: 80px; /* Para evitar que el contenido se superponga al navbar */
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto; /* Habilita el desplazamiento cuando el contenido sea demasiado largo */
}

.menu-list {
  list-style-type: none;
  padding: 0;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.menu-item-info {
  display: flex;
  flex-direction: column;
}

.menu-item-name {
  font-weight: bold;
}

.menu-item-price {
  font-size: 1.2rem;
  color: #333;
}

/* Botón de agregar */
.add-button {
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
}

.add-button i {
  font-size: 1.5rem;
}

/* Formulario */
.form {
  margin-top: 20px;
  background-color: #faf1e6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #ddd; 
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espaciado entre los campos */
}

/* InputTextField */
.text-form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  text-align: left;
  color: #555555;
  font-size: 1rem;
  font-weight: 600;
}

input {
  padding: 12px;
  font-size: 1rem;
  width: 100%;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 5px;
  transition: border-color 0.3s ease;
  background-color: #f9f9f9;
  color: #333;
}

input:focus {
  border-color: #76c7c0;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
  background-color: #f9f9f9;
}

/* Botones de envío y cancelación */
.submit-container {
  display: flex;
  justify-content: space-between;
}

.submit-button,
.cancel-button {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-button {
  background-color: #28a745;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

</style>
