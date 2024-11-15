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
  accept: String,
});

const emit = defineEmits(['update:file']);

const fileName = ref('No file chosen');
const inputFileRef = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
    emit('update:file', file);
  }
};

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
  display:none; 
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
