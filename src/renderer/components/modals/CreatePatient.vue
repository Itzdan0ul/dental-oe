<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const emit = defineEmits(['toggle-modal']);

  const patientName = ref('');
  const phone = ref('');
  const age = ref('');

  const closeModal = () => {
    emit('toggle-modal', '');
  };

  const createPatient = async () => {
    const Swal = await import('sweetalert2');

    if (patientName.value === '' || phone.value === '' || age.value === '') {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes llenar todos los campos.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    if (phone.value.length < 10) {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'El teléfono debe tener 10 dígitos.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    const patient = {
      name: patientName.value,
      phone: phone.value,
      age: age.value,
    };

    const result = await window.electronAPI.invoke('patient:create', patient);

    if (result) {
      await store.dispatch('patient/getPatients');
      closeModal();
    }
  };
</script>

<template>
  <div class="create-patient">
    <div class="create-patient__modal">
      <div class="create-patient__close">
        <button class="create-patient__close-btn" title="Cerrar" role="button" @click="closeModal()">
          <img class="create-patient__close-btn-icon" src="../../assets/images/close.svg" alt="Icono de equis." />
        </button>
      </div>
      <div class="create-patient__header">
        <h2 class="create-patient__title">Crear Paciente</h2>
      </div>
      <div class="create-patient__body">
        <div class="create-patient__textbox create-patient__position-1">
          <label for="patient-name">Nombre:</label>
          <input
            id="patient-name"
            type="text"
            maxlength="32"
            placeholder="Escribe el nombre del paciente"
            v-model.trim="patientName"
          />
        </div>
        <div class="create-patient__textbox create-patient__position-2">
          <label for="phone">Teléfono:</label>
          <input
            id="phone"
            type="tel"
            maxlength="10"
            placeholder="Escribe el teléfono del paciente"
            pattern="[0-9]{10}"
            v-model.trim="phone"
          />
        </div>
        <div class="create-patient__textbox">
          <label for="age">Edad:</label>
          <input
            id="age"
            type="number"
            min="0"
            max="99"
            placeholder="Escribe la edad del paciente"
            v-model.trim="age"
          />
        </div>
      </div>
      <div class="create-patient__footer">
        <button
          class="create-patient__create-btn"
          title="Dar de alta a un nuevo paciente."
          role="button"
          @click="createPatient()"
        >
          Crear Paciente
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .create-patient {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 3;
  }

  .create-patient__modal {
    background-color: #fff;
    border-radius: 0.4375em;
    height: auto;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 45em;
  }

  .create-patient__close {
    display: flex;
    justify-content: flex-end;
    margin: 0.3125em;
  }

  .create-patient__close-btn {
    align-items: center;
    background-color: transparent;
    border: 0;
    border-radius: 0.1875rem;
    display: flex;
    justify-content: center;
  }

  .create-patient__close-btn:hover {
    background-color: #f5f5f5;
    transition: 0.3s ease-in-out;
  }

  .create-patient__close-btn-icon {
    height: 1.5em;
    width: 1.5em;
    -webkit-user-drag: none;
  }

  .create-patient__header {
    margin: 0 1.25em;
  }

  .create-patient__body {
    display: grid;
    gap: 1.25em;
    grid-template-columns: auto auto;
    grid-template-columns: auto auto;
    margin: 1.25em;
  }

  .create-patient__textbox {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  .create-patient__position-1 {
    grid-column: 1 / 3;
  }

  .create-patient__position-2 {
    grid-column: 1;
  }

  .create-patient__footer {
    display: flex;
    flex-direction: column;
    margin: 1.25em;
  }

  .create-patient__create-btn {
    background-color: #2d366d;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    height: 3.75em;
  }

  .create-patient__create-btn:hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgb(45 54 109 / 50%);
    transition: 0.3s ease-in-out;
  }
</style>
