<template>
    <div>
      <h2>Restaurantes Disponibles</h2>
      <div v-for="restaurante in restaurantes" :key="restaurante.nombre" class="restaurante">
        <h3>{{ restaurante.nombre }}</h3>
        <img :src="restaurante.logoUrl" alt="Logo del restaurante" width="100" />
        <p>Horarios: {{ restaurante.horarios }}</p>
        <a :href="restaurante.cartaUrl" target="_blank">Ver Carta</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Aquí se cargarían los datos desde el backend o una API
        restaurantes: [
          {
            nombre: 'Restaurante Ejemplo',
            logoUrl: 'https://via.placeholder.com/100',
            horarios: 'Lun - Vie: 10:00 - 22:00',
            cartaUrl: '#'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .restaurante {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  