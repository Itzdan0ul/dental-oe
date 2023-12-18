<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const emit = defineEmits(['toggle-modal']);

  const type = ref('Seleccionar Tratamiento');
  const cost = ref(0);
  const payment = ref(0);
  const patient = ref('Seleccionar Paciente');

  const patients = computed(() => store.getters['patient/patients']);

  onMounted(async () => {
    await store.dispatch('patient/getPatients');
  });

  const closeModal = () => {
    emit('toggle-modal', '');
  };

  const createTreatment = async () => {
    const Swal = await import('sweetalert2');

    if (patient.value === 'Seleccionar Paciente') {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un paciente.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    if (type.value === 'Seleccionar Tratamiento') {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un tratamiento.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    if (cost.value === 0) {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes escribir el costo del tratamiento.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    const treatment = {
      patientId: document.querySelector('#patient-name').selectedOptions[0].getAttribute('data-id'),
      type: type.value,
      cost: cost.value,
      payment: payment.value,
    };

    const result = await window.electronAPI.invoke('treatment:create', treatment);

    if (result) {
      await store.dispatch('treatment/getTreatments');
      closeModal();
    }
  };
</script>

<template>
  <div class="create-treatment">
    <div class="create-treatment__modal">
      <div class="create-treatment__close">
        <button class="create-treatment__close-btn" title="Cerrar" role="button" @click="closeModal()">
          <img class="create-treatment__close-btn-icon" src="../../assets/images/close.svg" alt="Icono de equis." />
        </button>
      </div>
      <div class="create-treatment__header">
        <h2 class="create-treatment__title">Asignar Tratamiento</h2>
      </div>
      <div class="create-treatment__body">
        <div class="create-treatment__textbox create-treatment__position-1">
          <label for="patient-name">Paciente:</label>
          <select id="patient-name" v-model="patient">
            <option value="Seleccionar Paciente">Seleccionar Paciente</option>
            <option :data-id="patientList.id" :value="patientList.name" v-for="(patientList, i) in patients" :key="i">
              {{ patientList.name }}
            </option>
          </select>
        </div>
        <div class="create-treatment__textbox create-treatment__position-1">
          <label for="treatment-type">Tratamiento:</label>
          <select id="treatment-type" v-model="type">
            <option value="Seleccionar Tratamiento">Seleccionar Tratamiento</option>
            <option value="Ortodoncia">Ortodoncia</option>
            <option value="Odontología">Odontología</option>
            <option value="Cirugía">Cirugía</option>
          </select>
        </div>
        <div class="create-treatment__textbox create-treatment__position-2">
          <label for="cost">Costo:</label>
          <input
            id="cost"
            type="number"
            min="0"
            max="999999"
            placeholder="Escribe el costo del tratamiento"
            pattern="[0-9]{10}"
            v-model.trim="cost"
          />
        </div>
        <div class="create-treatment__textbox">
          <label for="payment">Abono:</label>
          <input
            id="payment"
            type="number"
            min="0"
            max="999999"
            placeholder="Escribe el abono del tratamiento (opcional)"
            v-model.trim="payment"
          />
        </div>
      </div>
      <div class="create-treatment__footer">
        <button
          class="create-treatment__create-btn"
          title="Dar de alta a un nuevo paciente."
          role="button"
          @click="createTreatment()"
        >
          Asignar Tratamiento
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .create-treatment {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 3;
  }

  .create-treatment__modal {
    background-color: #fff;
    border-radius: 0.4375em;
    height: auto;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 45em;
  }

  .create-treatment__close {
    display: flex;
    justify-content: flex-end;
    margin: 0.3125em;
  }

  .create-treatment__close-btn {
    align-items: center;
    background-color: transparent;
    border: 0;
    border-radius: 0.1875rem;
    display: flex;
    justify-content: center;
  }

  .create-treatment__close-btn:hover {
    background-color: #f5f5f5;
    transition: 0.3s ease-in-out;
  }

  .create-treatment__close-btn-icon {
    height: 1.5em;
    width: 1.5em;
    -webkit-user-drag: none;
  }

  .create-treatment__header {
    margin: 0 1.25em;
  }

  .create-treatment__body {
    display: grid;
    gap: 1.25em;
    grid-template-columns: auto auto;
    grid-template-columns: auto auto;
    margin: 1.25em;
  }

  .create-treatment__textbox {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  .create-treatment__position-1 {
    grid-column: 1 / 3;
  }

  .create-treatment__position-2 {
    grid-column: 1;
  }

  .create-treatment__footer {
    display: flex;
    flex-direction: column;
    margin: 1.25em;
  }

  .create-treatment__create-btn {
    background-color: #2d366d;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    height: 3.75em;
  }

  .create-treatment__create-btn:hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgb(45 54 109 / 50%);
    transition: 0.3s ease-in-out;
  }
</style>
