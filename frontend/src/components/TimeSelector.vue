<template>
  <div class="time-selector">
    <label>{{ label }}</label>

    <div class="time-inputs">
      <div class="time-field">
        <label for="horaApertura">Apertura</label>
        <input
          type="time"
          id="horaApertura"
          v-model="horaApertura"
          @input="emitTime"
          @focus="openTimePicker('horaApertura')"
          required
          class="input"
        />
      </div>

      <div class="time-field">
        <label for="horaCierre">Cierre</label>
        <input
          type="time"
          id="horaCierre"
          v-model="horaCierre"
          @input="emitTime"
          @focus="openTimePicker('horaCierre')"
          required
          class="input"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: { type: String, default: 'Times' }
});

const emit = defineEmits(['update:horaApertura', 'update:horaCierre']);

const horaApertura = ref('');
const horaCierre = ref('');

// Emitir los valores seleccionados hacia el componente principal
const emitTime = () => {
  emit('update:horaApertura', horaApertura.value);
  emit('update:horaCierre', horaCierre.value);
};

const openTimePicker = (inputId) => {
  const inputElement = document.getElementById(inputId);
  inputElement.showPicker();
};
</script>

<style scoped>
.time-selector {
  display: flex;
  flex-direction: column;
}

label {
  color: #555555;
}

.time-inputs {
  display: flex;
  gap: 10px;
}

.time-field {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
}
</style>
