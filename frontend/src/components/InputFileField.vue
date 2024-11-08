<!--recibe: id, label, accept-->
<template>
  <div class="form-field">

    <label :for="id">{{ label }}</label>
    <input
      ref="inputFileRef"
      type="file"
      :id="id"
      :accept="accept"
      @change="handleFileChange"
    />
    <button type="button" @click="triggerFileInput">Elegir archivo</button>
    <span>{{ fileName }}</span>
    
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  accept: String, // Permite definir el tipo de archivo aceptado, como 'image/*' o 'application/pdf'
});

const emit = defineEmits(['update:file']);

const fileName = ref('No file chosen');
const inputFileRef = ref(null); // Referencia para el input de archivo

// Función para manejar el cambio de archivo
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
    emit('update:file', file); // Emitir el archivo al componente padre
  }
};

// Función para activar el input de archivo cuando el botón es presionado
const triggerFileInput = () => {
  inputFileRef.value.click();
};
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  max-width: 300px;
}

label {
  text-align: left;
  color: #555555;
}

input[type="file"] {
  display:none; /* Oculta el input original */
}

button {
  background-color: #4A90E2;
  color: white;
  border-radius: 8px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 5px;
}

button:hover {
  background-color: #357ABD;
}

span {
  font-size: 14px;
  color: #777;
  margin-top: 10px;
}
</style>
