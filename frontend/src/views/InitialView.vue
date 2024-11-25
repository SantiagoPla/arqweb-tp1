<template>
    <div class="container">
      <div class="navbar">
        <h2 class="restaurant-name">Ver la carta</h2>
      </div>
  
      <div class="buttons">
        <button @click="goTo('/user')" class="order-button">Modo Usuario</button>
        <button @click="goTo('/business')" class="order-button">Modo Negocio</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goTo(path) {
    router.push(path);
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: #f7f7f7;
  }
  
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #e5d7c7;
    color: white;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  
  .restaurant-name {
    font-size: 2rem;
    font-weight: bold;
    margin-left: 10px;
    color: #2C3E50;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
    gap: 20px;
  }
  
  .order-button {
    background-color: #E67E22; 
    color: white;
    border: none;
    padding: 12px 25px;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 8px;
    width: 220px;
    max-width: 450px;
    transition: background-color 0.3s ease, transform 0.2s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .order-button:hover {
    background-color: #F39C12;
    transform: translateY(-2px);
  }
  
  .order-button:disabled {
    background-color: #BDC3C7;
    cursor: not-allowed;
    transform: translateY(0);
  }
  
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: #f7f7f7;
  }
  </style>
  