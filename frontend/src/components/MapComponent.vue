<template>
  <div class="map" ref="mapContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { initMap, addRestaurantMarkersToMap } from '../utils/mapUtils';
import { fetchRestaurants } from '../services/restaurantService'; 

const mapContainer = ref(null);
const restaurantData = ref([]);


onMounted(async () => {
  const map = initMap(mapContainer.value);
  restaurantData.value = await fetchRestaurants();
  addRestaurantMarkersToMap(map, restaurantData.value);
});
</script>

<style scoped>
.map {
  margin-top: 20px;
  display: grid;
  gap: 15px;
  width: 100%;
  background-color: #faf1e6; 
  border: 2px solid #ddd; 
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  height: 500px;
}
</style>
