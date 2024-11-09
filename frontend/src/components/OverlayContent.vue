<template>
    <div class="overlay-content">
      <button @click="closeOverlay" class="close-btn">×</button>
      <div class="content">
        <h3>{{ nombre }}</h3>
        <p><strong>Descripción:</strong> {{ descripcion }}</p>
        <p><strong>Dirección:</strong> {{ direccion }}</p>
        <p><strong>Horarios:</strong> {{ horarios }}</p>
        <div class="buttons">
          <button @click="viewMenu" class="btn btn-primary">Ver Menú</button>
          <button @click="placeOrder" class="btn btn-success">Hacer Pedido</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    nombre: String,
    descripcion: String,
    direccion: String,
    horarios: String,
    closeOverlay: Function, // Función para cerrar el overlay
  });
  
  const viewMenu = () => {
    alert(`Mostrando el menú de ${props.nombre}`);
  };
  
  const placeOrder = () => {
    alert(`Ir a la página de pedidos para ${props.nombre}`);
  };
  </script>
  
  <style scoped>
  .overlay-content {
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    width: 200px;
  }
  
  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    border: none;
    font-size: 20px;
    color: #333;
    cursor: pointer;
  }
  
  .content {
    padding-top: 20px;
  }
  
  .buttons {
    margin-top: 10px;
  }
  
  .btn {
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
  }
  
  .btn-success {
    background-color: #28a745;
    color: white;
    border: none;
  }
  
  </style>
  