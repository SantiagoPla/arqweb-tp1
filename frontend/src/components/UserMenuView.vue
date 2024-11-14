<template>
    <div>
      <h2>Menú del Restaurante</h2>
      <!-- Aquí se renderiza el menú del restaurante con el ID -->
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const restaurantId = route.params.id;
  
  // Aquí puedes usar restaurantId para cargar el menú del restaurante desde una API
  </script>
  