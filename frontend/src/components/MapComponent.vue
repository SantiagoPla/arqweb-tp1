<template>
  <div class="map" ref="mapContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { initMap, addRestaurantMarkersToMap } from '../utils/mapUtils';
import { fetchRestaurants } from '../services/restaurantService'; // Importa el servicio
import Restaurant from '../models/Restaurant';

const mapContainer = ref(null);
const restaurantData = ref([]);


const restaurant1 = Restaurant();
restaurant1.id = '1'
restaurant1.name =  'Restaurante La Bella'
restaurant1.longitude= '-58.3816'
restaurant1.latitude= '-34.6037'
restaurant1.address= 'Av. Corrientes 1368, Buenos Aires, Argentina'
restaurant1.phoneNumber= '+54 11 1234-5678'
restaurant1.email= 'contacto@labella.com'
restaurant1.instagram= 'https://instagram.com/labella'
restaurant1.openingTime= '10:00'
restaurant1.closingTime= '22:00'

restaurantData.value = [restaurant1]



onMounted(async () => {
  const map = initMap(mapContainer.value);
  //restaurantData.value = await fetchRestaurants();
  addRestaurantMarkersToMap(map, restaurantData.value);
});
</script>

<style scoped>
.map {
  margin-top: 20px;
  display: grid;
  gap: 15px;
  width: 100%;
  background-color: #faf1e6; /* Color crema para el formulario */
  border: 2px solid #ddd; /* Bordes suaves */
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  height: 500px;
}
</style>
