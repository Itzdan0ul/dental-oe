<script setup>
  import moment from 'moment';
  import { useStore } from 'vuex';
  import { onMounted, computed } from 'vue';

  const store = useStore();

  const patients = computed(() => store.getters['patient/patients']);

  onMounted(async () => {
    await store.dispatch('patient/getPatients');
  });

  const deletePatient = async (patient) => {
    const Swal = await import('sweetalert2');

    const { id } = patient;

    Swal.default
      .fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#205d9b',
        cancelButtonColor: '#e87575',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const result = await window.electronAPI.invoke('patient:delete', id);

          if (result) {
            Swal.default.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El paciente ha sido eliminado.',
              showConfirmButton: false,
              timer: 2100,
            });

            await store.dispatch('patient/getPatients');
          }
        }
      });
  };
</script>

<template>
  <div class="patient">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Teléfono</th>
          <th>Fecha de alta</th>
          <th>Ùlt. actualización</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, i) in patients" :key="i">
          <td>{{ patient.name }}</td>
          <td>{{ patient.age }}</td>
          <td>{{ patient.phone }}</td>
          <td>{{ moment(patient.createdAt).format('lll') }}</td>
          <td>{{ patient.updatedAt === null ? 'Sin cambios' : moment(patient.updatedAt).format('lll') }}</td>
          <td>
            <div class="patient__actions">
              <button class="patient__btn patient__btn--edit" title="Editar" role="button">
                <img class="patient__btn-icon" src="../../assets/images/edit.svg" alt="Icono de un lapiz" />
              </button>
              <button
                class="patient__btn patient__btn--remove"
                title="Eliminar"
                role="button"
                @click="deletePatient(patient)"
              >
                <img
                  class="patient__btn-icon"
                  src="../../assets/images/remove.svg"
                  alt="Icono de un bote de basura con una equis."
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .patient__actions {
    display: flex;
    justify-content: center;
    gap: 1.25em;
  }

  .patient__btn {
    align-items: center;
    border: 0;
    border-radius: 100%;
    display: flex;
    height: 1.25em;
    justify-content: center;
    width: 1.25em;
  }

  .patient__btn--edit {
    background-color: #205d9b;
  }

  .patient__btn--edit:hover {
    background-color: #1a4a7a;
    transition: 0.3s ease-in-out;
  }

  .patient__btn--remove {
    background-color: #e87575;
  }

  .patient__btn--remove:hover {
    background-color: #d96b6b;
    transition: 0.3s ease-in-out;
  }

  .patient__btn-icon {
    height: 1.125em;
    width: 1.125em;
  }
</style>
