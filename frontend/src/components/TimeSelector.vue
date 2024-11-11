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
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  label: { type: String, default: 'Times' },
  horaApertura: { type: String, default: '' },
  horaCierre: { type: String, default: '' }
});

const emit = defineEmits(['update:horaApertura', 'update:horaCierre']);

const horaApertura = ref(props.horaApertura);
const horaCierre = ref(props.horaCierre);

// Emitir los valores seleccionados hacia el componente principal
const emitTime = () => {
  emit('update:horaApertura', horaApertura.value);
  emit('update:horaCierre', horaCierre.value);
};

const openTimePicker = (inputId) => {
  const inputElement = document.getElementById(inputId);
  inputElement.showPicker();
};

// Si las props cambian, actualizar los valores internos
watch(() => props.horaApertura, (newVal) => {
  horaApertura.value = newVal;
});

watch(() => props.horaCierre, (newVal) => {
  horaCierre.value = newVal;
});
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
