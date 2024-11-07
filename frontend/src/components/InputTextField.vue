<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      v-model="inputValue"
      :id="id"
      :placeholder="placeholder"
      :required="required"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

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

const emit = defineEmits(['update:modelValue']);

// En vez de usar 'watch', usamos directamente el v-model para la vinculación automática
const inputValue = ref(props.modelValue);

// Aquí es donde Vue maneja el 'update:modelValue' por sí mismo cuando se usa v-model
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: bold;
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
</style>
