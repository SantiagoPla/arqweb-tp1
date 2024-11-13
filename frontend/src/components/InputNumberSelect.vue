<template>
    <div class="select-field">
      <label :for="id">{{ label }}</label>
      <select v-model="selectedValue" :id="id" @change="updateValue">
        <option v-for="i in range" :key="i" :value="i">{{ i }}</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    id: String,
    label: String,
    min: { type: Number, default: 1 },  
    max: { type: Number, default: 10 }, 
    modelValue: { type: [String, Number], default: null } 
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const range = Array.from({ length: props.max - props.min + 1 }, (_, i) => i + props.min);
  
  const selectedValue = ref(props.modelValue);
  
  const updateValue = () => {
    emit('update:modelValue', selectedValue.value);
  };
  </script>
  
  <style scoped>
  .select-field {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  
  label {
    color: #555;
  }
  
  select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    width: 50%;
    margin: 5px auto;
    transition: border-color 0.3s ease;
  }
  
  select:focus {
    border-color: #4CAF50;
    outline: none;
  }

  option {
    text-align: center
  }
  </style>
  