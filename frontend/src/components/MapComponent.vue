<template>
  <div class="map" ref="mapContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { initMap, addMarkersToMap } from '../utils/mapUtils';

const mapContainer = ref(null);

const restaurantData = [
  {
    nombre: 'Restaurante 1',
    ubicacion: [-58.3816, -34.6037],
    descripcion: 'Restaurante de comida italiana',
    direccion: 'Calle Falsa 123',
    horarios: 'Lun-Vie: 10am-10pm',
  },
  {
    nombre: 'Restaurante 2',
    ubicacion: [-58.3712, -34.6083],
    descripcion: 'Restaurante de comida japonesa',
    direccion: 'Av. Siempre Viva 456',
    horarios: 'Mar-Dom: 12pm-11pm',
  },
];

onMounted(() => {
  const map = initMap(mapContainer.value);
  addMarkersToMap(map, restaurantData);
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
