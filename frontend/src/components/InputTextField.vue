<!--recibe: id, label, valor a cambiar en el padre (como v-model)-->
<template>
  <div class="text-form-field">

    <label :for="id">{{ label }}</label>
    <input
      v-model="inputValue"
      :id="id"
      :placeholder="placeholder"
      :required="required"
      @input="updateValue"
    />

  </div>
</template>


<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  placeholder: String,
  required: { type: Boolean, default: false },
  modelValue: {
    type: String,
    default: '' // O el valor predeterminado que desees
  },
});

const emit = defineEmits(['update:modelValue']); //cada vez que inputValue cambie se dispara este evento, que es capturado por el padre.
const inputValue = ref(props.modelValue);

// Emitir el valor actualizado al componente padre cuando el valor de input cambie
const updateValue = () => {
  emit('update:modelValue', inputValue.value);
};

// Sincronizar el valor de modelValue cuando cambie desde el padre
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
});
</script>


<style scoped>
.text-form-field {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 200%;  
}

label {
  text-align: left;
  color: #555555;
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
  background-color: #f9f9f9;
  color: #333; 
}

input:focus {
  border-color: #ccc;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
  background-color: #f9f9f9;
}
</style>
