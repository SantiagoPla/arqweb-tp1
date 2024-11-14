<template>
    <div class="overlay-content">
      <button @click="closeOverlay" class="close-btn">×</button>
      <div class="content">
        <h3>{{ featureRestaurant.name }}</h3>
        
        <p><strong>Dirección:</strong> {{ featureRestaurant.address }}</p>

        <p><strong>Teléfono:</strong> {{ featureRestaurant.phone_number }}</p>
        <p><strong>Email:</strong> {{ featureRestaurant.email }}</p>
        <p><strong>Instagram:</strong> {{ featureRestaurant.instagram }}</p>
        
        <p><strong>Horarios:</strong> {{ featureRestaurant.opening_time + ' - ' + featureRestaurant.closing_time }}</p>
        <div class="buttons">
          <button @click="viewMenu" class="btn btn-primary">Ver Menú</button>
          <button @click="placeOrder" class="btn btn-success">Hacer Pedido</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>  


  const props = defineProps({
    featureRestaurant: Object,
    closeOverlay: Function, 
    router: Object
  });
  
  const viewMenu = () => {
    alert(`Mostrando el menú de ${props.name}`);
  };
  
  const placeOrder = () => {
    console.log(props.featureRestaurant.mongo_id)
    props.router.push(`/restaurant/${props.featureRestaurant.mongo_id}`);
  };
  </script>
  
  <style scoped>
  .overlay-content {
    background: #d1b38c; /* Crema más oscuro para contraste */
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); /* Sombra más suave para contraste */
    position: relative;
    width: 200px;
    border: 1px solid #b8996b; /* Borde beige/marrón para más definición */
    z-index:999;
    position: absolute;
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
    padding-top: 10px;
  }
  
  .buttons {
    margin-top: 10px;
    display: flex;
  }
  
  .btn {
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    flex: 1;
  }
  
  .btn-primary {
    background-color: #4A90E2;
    color: white;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 2px;
  }
  
  .btn-success {
    background-color: #E67E22;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 2px;
  }
  </style>
  