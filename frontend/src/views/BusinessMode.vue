<template>
  <div class="container">
    <h1 class="title">Nuevo restaurante</h1>

    <form @submit.prevent="crearRestaurante">
      <InputTextField
        id="nombre"
        label="Nombre del Restaurante"
        v-model="newRestaurant.name"
        required
      />
      
      <InputTextField
        id="address"
        label="Dirección"
        v-model="newRestaurant.address"
        required
        placeholder="Av. Corrientes 1368"
      />

      <InputTextField
        id="phone-number"
        label="Teléfono"
        v-model="newRestaurant.phone_number"
        required
      />

      <InputTextField
        id="instagram"
        label="Instagram"
        v-model="newRestaurant.instagram"
        required
      />

      <InputTextField
        id="email"
        label="Email"
        v-model="newRestaurant.email"
        required
      />

      <InputNumberSelect
        id="tables"
        label="Cantidad de mesas"
        v-model="newRestaurant.tables"
        :min="1" 
        :max="10" 
        required
      />

      <div class="location-container">
        <InputTextField
        class="location-field"
        id="longitude"
        label="Longitud"
        v-model="newRestaurant.longitude"
        required
        placeholder="Ej: -34.6037"
      />
      
      <InputTextField
        class="location-field"
        id="latitude"
        label="Latitud"
        v-model="newRestaurant.latitude"
        required
        placeholder="Ej: -58.0132"
      />
      </div>

      <TimeSelector
        label="Horarios"
        v-model:horaApertura="newRestaurant.opening_time"
        v-model:horaCierre="newRestaurant.closing_time"
        @update:horaApertura="newRestaurant.opening_time = $event"
        @update:horaCierre="newRestaurant.closing_time = $event"
      />
      
      <InputFileField
      id="logo"
      label="Logo"
      accept="image/*"
      @update:file="(file) => newRestaurantLogo = file"
      />

      <InputFileField
      id="carta"
      label="Carta"
      accept="application/pdf"
      @update:file="(file) => newRestaurantMenu = file"
      />

      <button type="submit">Crear Restaurante</button>
      
      <p v-if="restauranteCreado" class="success-text">¡Restaurante creado exitosamente!</p>

    </form>

  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputTextField from '../components/InputTextField.vue'; // Importar el componente de texto
import InputFileField from '../components/InputFileField.vue';
import TimeSelector from '../components/TimeSelector.vue';
import InputNumberSelect from '../components/InputNumberSelect.vue';
import Restaurant from '../models/Restaurant';
import { createRestaurant, addLogoToRestaurant } from '../services/restaurantService';

const router = useRouter();


const newRestaurant = ref(Restaurant());
const newRestaurantLogo = ref(null);


const restauranteCreado = ref(false); 

const reinicializarRestaurante = () => {
  newRestaurant.value = Restaurant();
  setTimeout(() => {
    restauranteCreado.value = false;
  }, 3000); 
}


const crearRestaurante = async () => {
  const restaurant_id = await createRestaurant(newRestaurant);
  
  await addLogoToRestaurant(newRestaurantLogo, restaurant_id);

  console.log(restaurant_id)
  restauranteCreado.value = true;
  reinicializarRestaurante();
  router.push(`/business/restaurant/${restaurant_id}`)
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

.title{
  width: 200%;
  margin: 10px;
  font-weight:bolder;
  font-family: 'Poppins', sans-serif;
  color: #2C3E50;
}

.location-container {
  display: flex;
  gap: 10px;
  text-align: center;
}

form {
  margin-top: 20px;
  display: grid;
  gap: 15px;
  justify-items: center;
  align-items: center;
  width: 100%;
  background-color: #faf1e6; 
  border: 2px solid #ddd; 
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #E67E22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}
button[type="submit"]:hover {
  background-color: #F39C12;
}


.success-text {
  color: #27ae60; 
  font-weight: normal;
}

</style>
