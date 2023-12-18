<script setup>
  import moment from 'moment';
  import { useStore } from 'vuex';
  import { onMounted, computed } from 'vue';

  const store = useStore();

  const treatments = computed(() => store.getters['treatment/treatments']);

  onMounted(async () => {
    await store.dispatch('treatment/getTreatments');
  });

  const deleteTreatment = async (treatment) => {
    const Swal = await import('sweetalert2');

    const { id } = treatment;

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
          const result = window.electronAPI.invoke('treatment:delete', id);
          if (result) {
            Swal.default.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El tratamiento ha sido eliminado.',
              showConfirmButton: false,
              timer: 2100,
            });

            await store.dispatch('treatment/getTreatments');
          }
        }
      });
  };
</script>

<template>
  <div class="treatment">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estatus</th>
          <th>Tipo</th>
          <th>Costo</th>
          <th>Abono</th>
          <th>Fecha de alta</th>
          <th>Ùlt. actualización</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(treatment, i) in treatments" :key="i">
          <td>{{ treatment.patientName }}</td>
          <td>{{ treatment.status }}</td>
          <td>{{ treatment.type }}</td>
          <td>{{ treatment.cost }}</td>
          <td>{{ treatment.payment }}</td>
          <td>{{ moment(treatment.createdAt).format('lll') }}</td>
          <td>{{ treatment.updatedAt === null ? 'Sin cambios' : moment(treatment.updatedAt).format('lll') }}</td>
          <td>
            <div class="treatment__actions">
              <button class="treatment__btn treatment__btn--edit" title="Editar" role="button">
                <img class="treatment__btn-icon" src="../../assets/images/edit.svg" alt="Icono de un lapiz" />
              </button>
              <button
                class="treatment__btn treatment__btn--remove"
                title="Eliminar"
                role="button"
                @click="deleteTreatment(treatment)"
              >
                <img
                  class="treatment__btn-icon"
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
  .treatment__actions {
    display: flex;
    justify-content: center;
    gap: 1.25em;
  }

  .treatment__btn {
    align-items: center;
    border: 0;
    border-radius: 100%;
    display: flex;
    height: 1.25em;
    justify-content: center;
    width: 1.25em;
  }

  .treatment__btn--edit {
    background-color: #205d9b;
  }

  .treatment__btn--edit:hover {
    background-color: #1a4a7a;
    transition: 0.3s ease-in-out;
  }

  .treatment__btn--remove {
    background-color: #e87575;
  }

  .treatment__btn--remove:hover {
    background-color: #d96b6b;
    transition: 0.3s ease-in-out;
  }

  .treatment__btn-icon {
    height: 1.125em;
    width: 1.125em;
  }
</style>
