<script setup>
  import { useStore } from 'vuex';
  import * as Modal from '@/components/modals';
  import { onMounted, ref, computed } from 'vue';

  const store = useStore();

  const selectedExpedient = ref({});
  const isViewExpedientModalVisible = ref(false);

  const expedients = computed(() => store.getters['expedient/expedients']);

  onMounted(() => {
    store.dispatch('expedient/getExpedients');
  });

  const openViewExpedientModal = (expedient) => {
    selectedExpedient.value = expedient;
    isViewExpedientModalVisible.value = true;
  };
</script>

<template>
  <template v-if="isViewExpedientModalVisible">
    <Modal.ViewExpedient
      :expedient="selectedExpedient"
      @toggle-modal="(showModal) => (isViewExpedientModalVisible = showModal)"
    />
  </template>
  <div class="home">
    <div class="home__card" v-for="(expedient, i) in expedients" :key="i">
      <div class="home__card-data">
        <div class="home__card-icon">
          <img src="../../assets/images/folder.svg" alt="Icono de un folder" />
        </div>
        <div class="home__card-info">
          <span><strong>Nro. de expedient:</strong> {{ expedient.number }}</span>
          <span><strong>Paciente:</strong> {{ expedient.patientName }}</span>
          <span><strong>Tratamiento:</strong> {{ expedient.treatmentType }}</span>
          <span class="home__card-status-container"
            ><strong>Estatus:</strong>
            <span class="home__card-status" :class="{ 'home__card-status--on': expedient.status === 'Vigente' }"
              >{{ expedient.status }}
            </span>
          </span>
        </div>
      </div>
      <div class="home__card-footer">
        <button
          class="home__card-btn"
          type="button"
          role="button"
          title="Cargar archivo"
          @click="openViewExpedientModal(expedient)"
        >
          Ver
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .home {
    display: grid;
    gap: 1.25em;
    place-content: center;
  }

  .home__card {
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 0.4375em;
    display: flex;
    flex-direction: column;
    gap: 1.5625em;
    height: 15.625em;
    justify-content: center;
    width: 38.75em;
  }

  .home__card-data {
    align-items: center;
    display: flex;
    gap: 1.25em;
  }

  .home__card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home__card-icon img {
    height: 8em;
    padding: 0 0 0 2.5em;
    width: 8em;
  }

  .home__card-info {
    display: flex;
    flex-direction: column;
    gap: 0.625em;
  }

  .home__card-status-container {
    display: flex;
    gap: 0.3125em;
  }

  .home__card-status {
    border-radius: 0.1875em;
    padding: 0.3125em;
  }

  .home__card-status--on {
    background-color: #0e7d49;
    color: #fff;
  }

  .home__card-btn {
    background-color: #8c4d55;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    font-weight: 600;
    height: 2.5em;
    width: 8.125em;
  }

  .home__card-btn:hover {
    box-shadow: 0 0 0 0.25rem rgb(140 77 85 / 50%);
    transition: 0.5s ease-in-out;
  }

  .home__card-footer {
    display: flex;
    justify-content: flex-end;
    margin: 0 1.25em 0 0;
  }
</style>
