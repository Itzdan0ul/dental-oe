<script setup>
  import moment from 'moment';
  import { useStore } from 'vuex';
  import { onMounted, computed } from 'vue';

  const store = useStore();

  const appointments = computed(() => store.getters['appointment/appointments']);

  onMounted(async () => {
    await store.dispatch('appointment/getAppointments');
  });

  const deleteAppointment = async (appointment) => {
    const Swal = await import('sweetalert2');

    const { id } = appointment;

    Swal.default
      .fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#205d9b',
        cancelButtonColor: '#e87575',
        confirmButtonText: 'Sí, cancela la cita',
        cancelButtonText: 'Cancelar',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const result = window.electronAPI.invoke('appointment:delete', id);
          if (result) {
            Swal.default.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'La cita ha sido cancelada correctamente.',
              showConfirmButton: false,
              timer: 2500,
            });

            await store.dispatch('appointment/getAppointments');
          }
        }
      });
  };
</script>

<template>
  <div class="appointment">
    <div class="appointment__card" v-for="(appointment, i) in appointments" :key="i">
      <div class="appointment__card-data">
        <div class="appointment__card-icon">
          <img src="../../assets/images/appointment.svg" alt="Icono de un folder" />
        </div>
        <div class="appointment__card-info">
          <span><strong>Paciente:</strong> {{ appointment.patientName }}</span>
          <span><strong>Fecha:</strong> {{ moment(appointment.date).format('ll') }}</span>
          <span><strong>Hora:</strong> {{ appointment.hour }}</span>
          <span><strong>Descripción:</strong> {{ appointment.description === '' ? '[Sin detalles]' : appointment.description }}</span>
        </div>
      </div>
      <div class="appointment__card-footer">
        <button
          class="appointment__card-btn"
          type="button"
          role="button"
          title="Cancelar cita"
          @click="deleteAppointment(appointment)"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .appointment {
    display: grid;
    gap: 1.25em;
    place-content: center;
  }

  .appointment__card {
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 0.4375em;
    display: flex;
    flex-direction: column;
    gap: 1.5625em;
    height: 15.625em;
    justify-content: center;
    width: 38.75em;
  }

  .appointment__card-data {
    align-items: center;
    display: flex;
    gap: 1.25em;
  }

  .appointment__card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .appointment__card-icon img {
    height: 8em;
    padding: 0 0 0 2.5em;
    width: 8em;
  }

  .appointment__card-info {
    display: flex;
    flex-direction: column;
    gap: 0.625em;
  }

  .appointment__card-status-container {
    display: flex;
    gap: 0.3125em;
  }

  .appointment__card-status {
    border-radius: 0.1875em;
    padding: 0.3125em;
  }

  .appointment__card-status--on {
    background-color: #0e7d49;
    color: #fff;
  }

  .appointment__card-btn {
    background-color: #ce8080;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    font-weight: 600;
    height: 2.5em;
    width: 8.125em;
  }

  .appointment__card-btn:hover {
    box-shadow: 0 0 0 0.25rem rgba(238, 100, 100, 0.5);
    transition: 0.5s ease-in-out;
  }

  .appointment__card-footer {
    display: flex;
    justify-content: flex-end;
    margin: 0 1.25em 0 0;
  }
</style>
