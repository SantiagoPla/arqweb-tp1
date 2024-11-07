<template>
  <div class="container">
    <h1>Modo Negocio</h1>

    <form @submit.prevent="crearRestaurante">
      <div class="form-field">
        <label for="nombre">Nombre del Restaurante:</label>
        <input v-model="nuevoRestaurante.nombre" type="text" id="nombre" required />
      </div>

      <div class="form-field">
        <label for="logo">Logo:</label>
        <input type="file" @change="handleFileChange('logo', $event)" id="logo" accept="image/*" />
        <button type="button" @click="triggerFileInput">Elegir archivo</button>
        <span>{{ fileName }}</span>
      </div>

      <div class="form-field">
        <label for="horarios">Horarios:</label>
        <input v-model="nuevoRestaurante.horarios" type="text" id="horarios" />
      </div>

      <div class="form-field">
        <label for="carta">Carta:</label>
        <input type="file" @change="handleFileChange('menu', $event)" id="menu" accept="application/pdf" />
        <button type="button" @click="triggerFileInput">Elegir archivo</button>
        <span>{{ fileName }}</span>
      </div>

      <div class="form-field">
        <label for="ubicacion">Ubicación (Lat, Lng):</label>
        <input v-model="nuevoRestaurante.ubicacion" type="text" id="ubicacion" placeholder="Ej: -34.6037, -58.3816" />
      </div>

      <button type="submit">Crear Restaurante</button>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const nuevoRestaurante = ref({
  nombre: '',
  logo: '',
  horarios: '',
  carta: '',
  ubicacion: ''
});

const fileName = ref('No file chosen'); // Variable para mostrar el nombre del archivo

// Función para manejar el cambio de archivo
const handleFileChange = (field, event) => {
  const file = event.target.files[0];
  if (file) {
    nuevoRestaurante.value[field] = file;
    fileName.value = file.name; // Mostrar nombre del archivo elegido
  }
};

// Función para activar el input file cuando el botón personalizado es presionado
const triggerFileInput = () => {
  document.getElementById('logo').click();
};

// Función para manejar el envío del formulario
const crearRestaurante = () => {
  //comunicarse con backend

  // Limpiar el formulario después de enviarlo
  nuevoRestaurante.value = {
    nombre: '',
    logo: '',
    horarios: '',
    carta: '',
    ubicacion: ''
  };
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 20px;
}

form {
  margin-top: 20px;
  display: grid;
  gap: 15px;
  justify-items: center;
  align-items: center;
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}

label {
  font-weight: bold;
  text-align: left;
  width: 100%;
}

.form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}

input {
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 5px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #45a060;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  max-width: 600px;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

input[type="file"] {
  display: none; /* Oculta el input original */
}

button[type="button"] {
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 5px;
}

button[type="button"]:hover {
  background-color: #45a049;
}

span {
  font-size: 14px;
  color: #777;
  margin-top: 10px;
}
</style>
