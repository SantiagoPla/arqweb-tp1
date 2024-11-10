<template>
  <div class="container">
    <h1 class="title">Mapa de Restaurantes</h1>
    <MapComponent class="map" />
  </div>
</template>

<script setup>
import MapComponent from '../components/MapComponent.vue';

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 20px;
  font-family: 'Roboto', sans-serif;
}

.title{
  margin: 10px;
  font-weight:bold;
  font-family: 'Poppins', sans-serif;
  color: #2C3E50;
}



</style>
