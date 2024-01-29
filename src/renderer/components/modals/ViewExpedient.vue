<script setup>
  import { useStore } from 'vuex';
  import { onMounted, ref, computed } from 'vue';
  
  const store = useStore();
  const emit = defineEmits(['toggle-modal']);

  const props = defineProps({
    expedient: {
      type: Object,
      required: true,
    },
  });

  onMounted(async () => {
    store.dispatch('medicalFile/getMedicalFiles', props.expedient.id);
  });

  const medicalFiles = computed(() => store.getters['medicalFile/medicalFiles']);

  const closeModal = () => {
    emit('toggle-modal', false);
  };

  const uploadMedicalFile = async () => {
    const isUploaded = await window.electronAPI.invoke('medicalFile:create', props.expedient.id);

    if (isUploaded) {
      await store.dispatch('medicalFile/getMedicalFiles', props.expedient.id);
    }
  };
</script>

<template>
  <div class="view-expedient">
    <div class="view-expedient__modal">
      <div class="view-expedient__close">
        <button class="view-expedient__close-btn" title="Cerrar" role="button" @click="closeModal()">
          <img class="view-expedient__close-btn-icon" src="../../assets/images/close.svg" alt="Icono de equis." />
        </button>
      </div>
      <div class="view-expedient__header">
        <h2 class="view-expedient__title">Expediente: {{ expedient.number }}</h2>
      </div>
      <div class="view-expedient__body">
        <div class="view-expedient__files">
          <div class="view-expedient__file" v-for="(medicalFile, i) in medicalFiles" :key="i">
            <img class="view-expedient__file-image"
              :src="'app://' + medicalFile.path.replace(/\\/g, '/')"
              :alt="medicalFile.name"
              :title="`Nombre: ${medicalFile.name}
                       Ruta: ${medicalFile.path}
                       Fecha de creación: ${medicalFile.createdAt}`"
            />
          </div>
          <button class="view-expedient__btn" type="button" role="button" @click="uploadMedicalFile()">
            <span>Subir</span>
            <img src="../../assets/images/upload.svg" alt="Icono de subir archivo." />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .view-expedient {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 3;
  }

  .view-expedient__modal {
    background-color: #fff;
    border-radius: 0.4375em;
    height: auto;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 80em;
  }

  .view-expedient__close {
    display: flex;
    justify-content: flex-end;
    margin: 0.3125em;
  }

  .view-expedient__close-btn {
    align-items: center;
    background-color: transparent;
    border: 0;
    border-radius: 0.1875rem;
    display: flex;
    justify-content: center;
  }

  .view-expedient__close-btn:hover {
    background-color: #f5f5f5;
    transition: 0.3s ease-in-out;
  }

  .view-expedient__close-btn-icon {
    height: 1.5em;
    width: 1.5em;
    -webkit-user-drag: none;
  }

  .view-expedient__header {
    margin: 0 1.25em;
  }

  .view-expedient__files {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25em;
    margin: 3.75em;
  }

  .view-expedient__btn {
    align-items: center;
    background-color: #fff;
    border: 0.0625rem dashed #c1c1c1;
    border-radius: 0.4375em;
    color: #c1c1c1;
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    height: 11.25em;
    justify-content: center;
    width: 8.75em;
  }

  .view-expedient__btn:hover {
    background-color: #fbfbfb;
    transition: 0.3s ease-in-out;
  }

  .view-expedient__file {
    align-items: center;
    background-color: #fff;
    border: 0;
    border-radius: 0.4375em;
    color: #c1c1c1;
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    height: 11.25em;
    justify-content: center;
    width: 8.75em;
  }

  .view-expedient__file-image {
    border-radius: 0.4375em;
    height: 11.25em;
    width: 8.75em;
    -webkit-user-drag: none;
  }
</style>
