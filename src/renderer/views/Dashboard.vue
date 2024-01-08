<script setup>
  import { ref } from 'vue';
  import { router } from '@/router';
  import * as Modal from '@/components/modals';

  document.title = 'Servicio Dental - Dashboard';

  const section = ref('home');
  const selectedModal = ref(null);

  const changeSection = (newSection) => {
    console.log(newSection);
    section.value = newSection;

    router.push(`/dashboard/${newSection}`);
  };

  const openModal = (modal) => {
    selectedModal.value = modal;
  };

  const getHelp = () => {
    window.electronAPI.send('help');
  };

  const logout = () => {
    window.electronAPI.send('logout');
  };
</script>

<template>
  <template v-if="selectedModal === 'create-expedient'">
    <Modal.CreateExpedient @toggle-modal="(showModal) => (selectedModal = showModal)" />
  </template>
  <template v-if="selectedModal === 'create-patient'">
    <Modal.CreatePatient @toggle-modal="(showModal) => (selectedModal = showModal)" />
  </template>
  <template v-if="selectedModal === 'create-treatment'">
    <Modal.CreateTreatment @toggle-modal="(showModal) => (selectedModal = showModal)" />
  </template>
  <div class="dashboard">
    <menu class="dashboard__menu">
      <div class="dashboard__menu-divisor">
        <div class="dashboard__menu-header">
          <img class="dashboard__menu-icon" src="../assets/images/logo@120x120.svg" alt="Icono del Servicio Dental." />
        </div>
        <div class="dashboard__menu-options">
          <button class="dashboard__menu-btn" title="Inicio" role="button">
            <img
              class="dashboard__menu-icons"
              src="../assets/images/home.svg"
              alt="Icono de casa que hace referencia al inicio."
            />
            <span class="dashboard__menu-text">Inicio</span>
          </button>
          <!-- <button class="dashboard__menu-btn" title="Herramientas" role="button">
            <img
              class="dashboard__menu-icons"
              src="../assets/images/tools.svg"
              alt="Icono de herramientas que hace referencia a la sección de herramientas."
            />
            <span class="dashboard__menu-text">Herramientas</span>
          </button> -->
        </div>
      </div>
      <div class="dashboard__menu-options">
        <button class="dashboard__menu-btn" title="Ayuda" role="button" @click="getHelp()">
          <img
            class="dashboard__menu-icons"
            src="../assets/images/help.svg"
            alt="Icono de signo de interrogación que hace referencia a la sección de ayuda."
          />
          <span class="dashboard__menu-text">Ayuda</span>
        </button>
        <button class="dashboard__menu-btn" title="Cerrar Sesión" role="button" @click="logout()">
          <img
            class="dashboard__menu-icons"
            src="../assets/images/logout.svg"
            alt="Icono de puerta con una flecha que hace referencia a cerrar sesión."
          />
          <span class="dashboard__menu-text">Cerrar Sesión</span>
        </button>
      </div>
    </menu>
    <main class="dashboard__layout">
      <div class="dashboard__header">
        <div class="dashboard__sections">
          <button
            class="dashboard__section-btn"
            :class="{ 'dashboard__section-btn--active': section === 'home' }"
            title="Ir a Expedientes"
            role="button"
            @click="changeSection('home')"
            >Expedientes</button
          >
          <button
            class="dashboard__section-btn"
            :class="{ 'dashboard__section-btn--active': section === 'patients' }"
            title="Ir a Pacientes"
            role="button"
            @click="changeSection('patients')"
            >Pacientes</button
          >
          <button
            class="dashboard__section-btn"
            :class="{ 'dashboard__section-btn--active': section === 'treatments' }"
            title="Ir a Tratamientos"
            role="button"
            @click="changeSection('treatments')"
            >Tratamientos</button
          >
          <button
            class="dashboard__section-btn"
            :class="{ 'dashboard__section-btn--active': section === 'appointments' }"
            title="Ir a Citas"
            role="button"
            @click="changeSection('appointments')"
            >Citas</button
          >
        </div>
        <div class="dashboard__buttons">
          <button
            class="dashboard__add-btn"
            title="Generar Expediente"
            role="button"
            v-show="section === 'home'"
            @click="openModal('create-expedient')"
          >
            <img src="../assets/images/folder.svg" alt="Icono de un folder." />
          </button>
          <button
            class="dashboard__add-btn"
            title="Agregar paciente"
            role="button"
            v-show="section === 'patients'"
            @click="openModal('create-patient')"
          >
            <img src="../assets/images/patient.svg" alt="Icono de un usuario." />
          </button>
          <button
            class="dashboard__add-btn"
            title="Asignar tratamiento"
            role="button"
            v-show="section === 'treatments'"
            @click="openModal('create-treatment')"
          >
            <img src="../assets/images/treatment.svg" alt="Icono de un diagnostico." />
          </button>
          <button class="dashboard__add-btn" title="Crear cita" role="button" v-show="section === 'appointments'">
            <img src="../assets/images/appointment.svg" alt="Icono de un calendario con un punto." />
          </button>
        </div>
      </div>
      <Transition enter-active-class="animate__animated animate__fadeIn">
        <router-view></router-view>
      </Transition>
    </main>
  </div>
</template>

<style scoped>
  .dashboard {
    background-color: #fdfdfd;
    display: grid;
    grid-template-columns: 7.5em auto;
  }

  .dashboard__menu {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.13);
    display: flex;
    flex-direction: column;
    grid-column: 1;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  .dashboard__menu-header {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 1.25em 0 1.875em 0;
  }

  .dashboard__menu-icon {
    height: 5em;
    width: 5em;
    -webkit-user-drag: none;
  }

  .dashboard__menu-options {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1.5625em;
  }

  .dashboard__menu-icons {
    height: 1.5em;
    width: 1.5em;
    -webkit-user-drag: none;
  }

  .dashboard__menu-text {
    color: #7a7a7a;
    font-size: 0.5625em;
    font-weight: 500;
  }

  .dashboard__menu-btn {
    align-items: center;
    background-color: #fff;
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 0.4375em;
    display: flex;
    flex-direction: column;
    height: 3.75em;
    justify-content: center;
    width: 3.75em;
  }

  .dashboard__menu-btn:hover {
    background-color: #ebebeb;
    transition: 0.3s ease-in-out;
  }

  .dashboard__layout {
    background-color: #fff;
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 0.4375em;
    margin: 1.25em;
  }

  .dashboard__header {
    display: flex;
    justify-content: space-between;
    margin: 1.25em;
  }

  .dashboard__sections {
    display: flex;
    gap: 1.25em;
  }

  .dashboard__section-btn {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.13);
    border-radius: 6.25em;
    color: #333;
    font-size: 0.875em;
    font-weight: 600;
    height: 2.5em;
    width: 8.125em;
  }

  .dashboard__section-btn--active {
    background-color: #2d366d;
    color: #fff;
  }

  .dashboard__section-btn:hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgb(45 54 109 / 50%);
    transition: 0.3s ease-in-out;
  }

  .dashboard__add-btn {
    align-items: center;
    background-color: transparent;
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 100%;
    display: flex;
    height: 2.5em;
    justify-content: center;
    width: 2.5em;
  }

  .dashboard__add-btn:hover {
    background-color: #ebebeb;
    transition: 0.3s ease-in-out;
  }
</style>
