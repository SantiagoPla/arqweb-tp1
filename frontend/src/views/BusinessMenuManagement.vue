<template>
  <div class="container">
    
    <div class="navbar">
      <div v-if="restaurantLogo">
      <img :src="restaurantLogo" alt="Logo del Restaurante" class="restaurant-logo" />
      </div>

      <h2 v-if="restaurantName" class="restaurant-name">{{ restaurantName }}</h2>

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
          <button @click="eliminarElemento(item.name)" class="delete-button">
            <i class="fas fa-trash"></i>
          </button>
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
import { fetchRestaurantById, fetchMenuById, fetchLogoById, addMenuItemToMenu, deleteMenuItem } from '../services/restaurantService';

const restaurantLogo = ref(null);
const restaurantName = ref('')

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
    const restaurantData = await fetchRestaurantById(restaurantId);
    restaurantName.value = restaurantData.name

    restaurantLogo.value = await fetchLogoById(restaurantId);
    menuItems.value = await fetchMenuById(restaurantId);
  } catch (error) {
    console.error('Error al cargar los datos del restaurante:', error);
  }
});


const agregarElemento = async () => {
  try {
    await addMenuItemToMenu({
        name: menuItem.value.name,
        description: menuItem.value.description,
        price: parseFloat(menuItem.value.price),  // Asegura que el precio sea float
      }, restaurantId);
    menuItem.value = { name: '', description: '', price: '' };
    menuItems.value = await fetchMenuById(restaurantId);
    
    showForm.value = false;
  } catch (error) {
    console.error('Error al agregar el elemento al menú:', error);
  }
};

const eliminarElemento = async (itemName) => {
  try {
    await deleteMenuItem(itemName, restaurantId); // Llama al servicio de eliminación
    menuItems.value = await fetchMenuById(restaurantId); // Actualiza la lista de menú
  } catch (error) {
    console.error('Error al eliminar el elemento del menú:', error);
  }
};

const toggleForm = () => {
  showForm.value = !showForm.value;
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
  font-size: 2rem; /* Aumenta el tamaño de la fuente */
  font-weight: bold;
  margin-left: 5px;
  color: #2C3E50; /* Un color oscuro para resaltar */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Sombra de texto para mayor énfasis */
  letter-spacing: 1px; /* Espaciado entre letras */
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
  width: 100%; 
  max-width: 1200px; 
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
  box-sizing: border-box;
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
  text-overflow: ellipsis; 
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
}

.add-button {
  margin-top: 20px;
  background-color: #E67E22;
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


.form {
  margin-top: 20px;
  background-color: #faf1e6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #ddd; 
  display: flex;
  flex-direction: column;
  gap: 15px; 
  align-items: center;
}

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

.submit-container {
  display: flex;
  justify-content: space-between
}

.submit-button,
.cancel-button {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 2.5px;
}

.submit-button {
  background-color: #28a745;
  color: white;
  margin-right: 2.5px;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-left: 15px;
}

.delete-button i {
  font-size: 1.2rem;
}

</style>
