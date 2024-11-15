<template>
  <div class="container">
    <h1 class="title">Mapa de Restaurantes</h1>
    <MapComponent class="map" />
  </div>

   <div class="cards" style="margin-top: 50px;display: flex;justify-content: space-around;flex-wrap: wrap;">
    <div v-for="(restaurant, index) in visibleRestaurants" :key="restaurant.name" :class="['card', isOpen(restaurant) ? 'open' : 'closed']">
      <img 
        :src="restaurant.hasLogo ? restaurant.logo : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/a4/d7/f1/salon.jpg'" 
        alt="Imagen del restaurante" 
        class="card-image" 
      />
      <div class="card-content">
        <h2 class="card-title">{{ restaurant.name }}</h2>
        <p><strong>Dirección:</strong> {{ restaurant.address }}</p>
        <p style="margin-bottom: 15px"><strong>Horario:</strong> {{ restaurant.opening_time }} - {{ restaurant.closing_time }}</p>
       <div style="display: flex; justify-content: space-evenly;">
          <a :href="`https://web.whatsapp.com/send?phone=${restaurant.phone_number}&text=Hola%20${encodeURIComponent(restaurant.name)}!%20Quería%20consultar%20sobre%20`" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" class="bi bi-whatsapp" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
          </a>
           <a :href="`https://www.instagram.com/${restaurant.instagram}`" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg"width="26" height="26" fill="black"  class="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
          </a>
        </div>        
      </div>
    </div>
  </div>

  <button @click="toggleShowMore" style="margin-top: 20px" class="show-more-btn">
    {{ showMore ? 'Mostrar menos' : 'Mostrar más' }}
</button>

</template>

<script setup>
import MapComponent from '../components/MapComponent.vue';
import { onMounted, ref, computed } from 'vue';

import { fetchRestaurants } from '../services/restaurantService'; 
const restaurantData = ref([]);
const showMore = ref(false);
const visibleRestaurants = computed(() => {
  return showMore.value ? restaurantData.value : restaurantData.value.slice(0, 4);
});

console.log('verrrr', restaurantData)
const isOpen = (restaurant) => {
  const currentTime = new Date();
  const openingTime = new Date();
  const closingTime = new Date();

  const [openingHour, openingMinute] = restaurant.opening_time.split(':');
  const [closingHour, closingMinute] = restaurant.closing_time.split(':');

  openingTime.setHours(openingHour, openingMinute, 0, 0);
  closingTime.setHours(closingHour, closingMinute, 0, 0);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const openingTotalMinutes = parseInt(openingHour) * 60 + parseInt(openingMinute);
  const closingTotalMinutes = parseInt(closingHour) * 60 + parseInt(closingMinute);
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  if (closingTotalMinutes > openingTotalMinutes) {
    return currentTotalMinutes >= openingTotalMinutes && currentTotalMinutes <= closingTotalMinutes;
  } else {
    return currentTotalMinutes >= openingTotalMinutes || currentTotalMinutes <= closingTotalMinutes;
  }
};

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

onMounted(async () => {
  restaurantData.value = await fetchRestaurants();
});
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

.card {
  width: 250px;
  margin: 5px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card.open {
  background-color: #e0ffe0;
  border: 2px solid black;
}

.card.closed {
  background-color: #ffe0e0;
  border: 2px solid #f44336;
  opacity: 0.6;
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card.open .card-title {
  color: black;
}

.card.closed .card-title {
  color: #f44336;
}

.card p {
  margin: 5px 0;
}

.card.open p {
  color: #2e7d32;
}

.card.closed p {
  color: #c62828;
}

.dynamic-title {
  font-size: 2.5em;
  color: white; /* Tomate */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.show-more-btn {
  background-color: black;
  color: white;
  font-family: 'Arial', sans-serif;
  font-size: 1.2em;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.show-more-btn:hover {
  background-color: #333;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes colorChange {
  from {
    color: #ff6347; /* Tomate */
  }
  to {
    color: #4682b4; /* Azul acero */
  }
}

</style>
