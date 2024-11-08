<template>
  <div class="container">
    <h1 class="title">Nuevo restaurante</h1>

    <form @submit.prevent="crearRestaurante">
      <InputTextField
        id="nombre"
        label="Nombre del Restaurante"
        v-model="nuevoRestaurante.nombre"
        required
        placeholder="Pizzería Black Jack"
      />
      
      <InputFileField
      id="logo"
      label="Logo"
      accept="image/*"
      @update:file="(file) => nuevoRestaurante.logo = file"
      />

      <InputFileField
      id="carta"
      label="Carta"
      accept="application/pdf"
      @update:file="(file) => nuevoRestaurante.carta = file"
      />

      <InputTextField
        id="ubicacion"
        label="Ubicación (Lat, Lng)"
        v-model="nuevoRestaurante.ubicacion"
        required
        placeholder="Ej: -34.6037, -58.3816"
      />

      <TimeSelector
        label="Horarios"
        v-model:horaApertura="nuevoRestaurante.horaApertura"
        v-model:horaCierre="nuevoRestaurante.horaCierre"
        @update:horaApertura="nuevoRestaurante.horaApertura = $event"
        @update:horaCierre="nuevoRestaurante.horaCierre = $event"
      />
      <button type="submit">Crear Restaurante</button>
      
      <p v-if="restauranteCreado" class="success-text">¡Restaurante creado exitosamente!</p>

    </form>

  </div>
</template>


<script setup>
import { ref } from 'vue';
import InputTextField from '../components/InputTextField.vue'; // Importar el componente de texto
import InputFileField from '../components/InputFileField.vue';
import TimeSelector from '../components/TimeSelector.vue';

const nuevoRestaurante = ref({
  nombre: '',
  logo: '',
  horaApertura: '',
  horaCierre: '',
  carta: '',
  ubicacion: ''
});

const restauranteCreado = ref(false); // Estado para controlar si el restaurante fue creado

const reinicializarRestaurante = () => {
  nuevoRestaurante.value = {
    nombre: '',
    logo: '',
    horaApertura: '',
    horaCierre: '',
    carta: '',
    ubicacion: ''
  };
  setTimeout(() => {
    restauranteCreado.value = false;
  }, 3000); 
}

const crearRestaurante = () => {
  //TO DO: comunicarse con backend ! ! !
  console.log(nuevoRestaurante.value)

  restauranteCreado.value = true;

  reinicializarRestaurante();
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
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

h1{
  width: 200%;
  margin: 10px;
  font-weight:bolder;
  font-family: 'Poppins', sans-serif;
  color: #2C3E50;
}

form {
  margin-top: 20px;
  display: grid;
  gap: 15px;
  justify-items: center;
  align-items: center;
  width: 100%;
  background-color: #faf1e6; /* Color crema para el formulario */
  border: 2px solid #ddd; /* Bordes suaves */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #E67E22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}
button[type="submit"]:hover {
  background-color: #F39C12;
}


.success-text {
  color: #27ae60; 
  font-weight: normal;
}

</style>
