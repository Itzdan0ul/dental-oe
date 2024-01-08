<script setup>
  import { useStore } from 'vuex';
  import { onMounted, ref, computed } from 'vue';

  const store = useStore();

  const expedients = computed(() => store.getters['expedient/expedients']);

  onMounted(() => {
    store.dispatch('expedient/getExpedients');
  });
</script>

<template>
  <div class="home">
    <div class="home__card" v-for="(expedient, i) in expedients" :key="i">
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
  </div>
</template>

<style scoped>
  .home {
    place-content: center;
    display: grid;
  }

  .home__card {
    align-items: center;
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 0.4375em;
    display: flex;
    gap: 1.5625em;
    height: 15.625em;
    width: 38.75em;
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
</style>
