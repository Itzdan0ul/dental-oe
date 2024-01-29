<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const emit = defineEmits(['toggle-modal']);
  const patient = ref('Seleccionar Paciente');
  const date = ref('');
  const hour = ref('');
  const description = ref('');

  const patients = computed(() => store.getters['patient/patients']);

  onMounted(async () => {
    await store.dispatch('patient/getPatients');
  });

  const closeModal = () => {
    emit('toggle-modal', '');
  };

  const createAppointment = async () => {
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

    if (date.value === '') {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar una fecha.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    if (hour.value === '') {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar una hora.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    const appointment = {
      patientId: document.querySelector('#patient-name').selectedOptions[0].getAttribute('data-id'),
      date: date.value,
      hour: hour.value,
      description: description.value,
    };

    const result = await window.electronAPI.invoke('appointment:create', appointment);

    if (result) {
      await store.dispatch('appointment/getAppointments');
      closeModal();
    }
  };
</script>

<template>
  <div class="create-appontment">
    <div class="create-appontment__modal">
      <div class="create-appontment__close">
        <button class="create-appontment__close-btn" title="Cerrar" role="button" @click="closeModal()">
          <img class="create-appontment__close-btn-icon" src="../../assets/images/close.svg" alt="Icono de equis." />
        </button>
      </div>
      <div class="create-appontment__header">
        <h2 class="create-appontment__title">Generar Cita</h2>
      </div>
      <div class="create-appontment__body">
        <div class="create-appontment__textbox create-appontment__position-1">
          <label for="patient-name">Paciente:</label>
          <select id="patient-name" v-model="patient">
            <option value="Seleccionar Paciente">Seleccionar Paciente</option>
            <option :data-id="patientList.id" :value="patientList.name" v-for="(patientList, i) in patients" :key="i">
              {{ patientList.name }}
            </option>
          </select>
        </div>
        <div class="create-appontment__textbox create-appontment__position-2">
          <label for="date">Fecha:</label>
          <input
            id="date"
            type="date"
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
            v-model.trim="date"
          />
        </div>
        <div class="create-appontment__textbox">
          <label for="hour">Hora:</label>
          <input
            id="hour"
            type="time"
            pattern="[0-9]{2}:[0-9]{2}"
            v-model.trim="hour"
          />
        </div>
        <div class="create-appontment__textbox">
          <label for="description">Descripción:</label>
          <textarea class="create-appointment-textarea" cols="30" rows="10" v-model.trim="description"></textarea>
        </div>
      </div>
      <div class="create-appontment__footer">
        <button
          class="create-appontment__create-btn"
          title="Dar de alta a un nuevo paciente."
          role="button"
          @click="createAppointment()"
        >
          Crear Cita
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .create-appontment {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 3;
  }

  .create-appontment__modal {
    background-color: #fff;
    border-radius: 0.4375em;
    height: auto;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 45em;
  }

  .create-appontment__close {
    display: flex;
    justify-content: flex-end;
    margin: 0.3125em;
  }

  .create-appontment__close-btn {
    align-items: center;
    background-color: transparent;
    border: 0;
    border-radius: 0.1875rem;
    display: flex;
    justify-content: center;
  }

  .create-appontment__close-btn:hover {
    background-color: #f5f5f5;
    transition: 0.3s ease-in-out;
  }

  .create-appontment__close-btn-icon {
    height: 1.5em;
    width: 1.5em;
    -webkit-user-drag: none;
  }

  .create-appontment__header {
    margin: 0 1.25em;
  }

  .create-appontment__body {
    display: grid;
    gap: 1.25em;
    grid-template-columns: auto auto;
    grid-template-columns: auto auto;
    margin: 1.25em;
  }

  .create-appontment__textbox {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  .create-appointment-textarea {
    border: 0.0625rem solid rgba(0, 0, 0, 0.5);
    border-radius: 0.1875rem;
    resize: none;
    outline: none;
  }

  .create-appontment__footer {
    display: flex;
    flex-direction: column;
    margin: 1.25em;
  }

  .create-appontment__create-btn {
    background-color: #2d366d;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    height: 3.75em;
  }

  .create-appontment__create-btn:hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgb(45 54 109 / 50%);
    transition: 0.3s ease-in-out;
  }
</style>
