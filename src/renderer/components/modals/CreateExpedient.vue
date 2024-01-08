<script setup>
  import moment from 'moment';
  import { useStore } from 'vuex';
  import { onMounted, ref, computed } from 'vue';
  
  const store = useStore();

  const emit = defineEmits(['toggle-modal']);

  const treatment = ref('Seleccionar Tratamiento por Paciente');

  const treatments = computed(() => store.getters['treatment/treatments']);

  onMounted(async () => {
    await store.dispatch('treatment/getTreatments');
  });

  const closeModal = () => {
    emit('toggle-modal', '');
  };

  const createExpedient = async () => {
    const Swal = await import('sweetalert2');

    if (treatment.value === 'Seleccionar Tratamiento por Paciente') {
      await Swal.default.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un tratamiento.',
      });

      return;
    }

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';

    for (let i = 0; i < 3; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const expedient = {
      number: `${moment().format('YYYYMMDDHHmmss')}-${key}`,
      treatmentId: document.querySelector('#treatments').selectedOptions[0].getAttribute('data-id'),
    };

    console.log(expedient);

    const result = await window.electronAPI.invoke('expedient:create', expedient);

    if (result) {
      await store.dispatch('expedient/getExpedients');
      closeModal();
    }
  };
</script>

<template>
  <div class="create-expedient">
    <div class="create-expedient__modal">
      <div class="create-expedient__close">
        <button class="create-expedient__close-btn" title="Cerrar" role="button" @click="closeModal()">
          <img class="create-expedient__close-btn-icon" src="../../assets/images/close.svg" alt="Icono de equis." />
        </button>
      </div>
      <div class="create-expedient__header">
        <h2 class="create-expedient__title">Generar Expediente</h2>
      </div>
      <div class="create-expedient__body">
        <div class="create-expedient__textbox create-expedient__position-1">
          <label for="treatments">Tratamientos:</label>
          <select id="treatments" v-model="treatment">
            <option value="Seleccionar Tratamiento por Paciente">Seleccionar Tratamiento por Paciente</option>
            <option :data-id="treatmentList.id" :value="treatmentList.type + ' - ' + treatmentList.patientName" v-for="(treatmentList, i) in treatments" :key="i">
              {{ treatmentList.type + ' - ' + treatmentList.patientName }}
            </option>
          </select>
        </div>
        <div class="create-expedient__footer">
          <button
            class="create-expedient__create-btn"
            title="Dar de alta nuevo expediente."
            role="button"
            @click="createExpedient()"
          >
            Generar Expediente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .create-expedient {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 3;
  }

  .create-expedient__modal {
    background-color: #fff;
    border-radius: 0.4375em;
    height: auto;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 45em;
  }

  .create-expedient__close {
    display: flex;
    justify-content: flex-end;
    margin: 0.3125em;
  }

  .create-expedient__close-btn {
    align-items: center;
    background-color: transparent;
    border: 0;
    border-radius: 0.1875rem;
    display: flex;
    justify-content: center;
  }

  .create-expedient__close-btn:hover {
    background-color: #f5f5f5;
    transition: 0.3s ease-in-out;
  }

  .create-expedient__close-btn-icon {
    height: 1.5em;
    width: 1.5em;
    -webkit-user-drag: none;
  }

  .create-expedient__header {
    margin: 0 1.25em;
  }

  .create-expedient__body {
    display: grid;
    gap: 1.25em;
    grid-template-columns: auto auto;
    grid-template-columns: auto auto;
    margin: 1.25em;
  }

  .create-expedient__textbox {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  .create-expedient__footer {
    display: flex;
    flex-direction: column;
    margin: 1.25em;
  }

  .create-expedient__create-btn {
    background-color: #2d366d;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    height: 3.75em;
  }

  .create-expedient__create-btn:hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgb(45 54 109 / 50%);
    transition: 0.3s ease-in-out;
  }
</style>
