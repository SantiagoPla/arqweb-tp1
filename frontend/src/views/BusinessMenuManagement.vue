<template>
    <div>
      <h2>Agregar Elementos al Menú</h2>
      <form @submit.prevent="agregarElemento">
        <InputTextField 
            label="Nombre" 
            v-model="menuItem.name" 
            required />
        
            <InputTextField 
                label="Descripción" 
                v-model="menuItem.description" 
                required />
        
            <InputTextField 
                label="Precio" 
                type="number" 
                v-model="menuItem.price" 
                required />
        
            <button type="submit">Agregar</button>
      </form>
  
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <strong>{{ item.name }}</strong> - {{ item.description }} - ${{ item.price }}
        </li>
      </ul>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  
  const menuItems = ref([]); 
  const menuItem = ref({
    name: '',
    description: '',
    price: ''
  });
  
  const agregarElemento = () => {
    menuItems.value.push({ ...menuItem.value });
    menuItem.value = { name: '', description: '', price: '' };
  };
</script>
  
<style scoped>

</style>
  