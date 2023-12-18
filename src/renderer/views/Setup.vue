<script setup>
  import { ref } from 'vue';

  const username = ref('');
  const password = ref('');

  const createSystemUser = async () => {
    const Swal = await import('sweetalert2');

    if (username.value === '' || password.value === '') {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes llenar todos los campos.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    if (password.value.length < 8) {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 8 caracteres.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    const user = {
      username: username.value,
      password: password.value,
    };

    window.electronAPI.send('setup:create', user);
  };
</script>

<template>
  <div class="setup">
    <form class="setup__form">
      <div class="setup__header">
        <h1 class="setup__title">Setup</h1>
        <p class="setup__description">Crea un usuario y una contraseña</p>
      </div>
      <main class="setup__body">
        <div class="setup__textbox">
          <label for="username">Usuario:</label>
          <input id="username" type="text" maxlength="32" placeholder="Escribe tu usuario" v-model.trim="username" />
        </div>
        <div class="setup__textbox">
          <label for="password">Contraseña:</label>
          <input id="password" type="password" placeholder="Escribe tu contraseña" v-model.trim="password" />
        </div>
      </main>
      <div class="setup__footer">
        <button
          class="setup__create-btn"
          title="Crear cuenta de usuario administrador."
          role="button"
          @click="createSystemUser()"
        >
          Crear Usuario
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .setup {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .setup__form {
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 0.1875rem;
    display: flex;
    flex-direction: column;
    height: 38.75em;
    padding: 3.6875em 3.25em;
    justify-content: space-around;
    width: 30em;
  }

  .setup__header {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .setup__title {
    color: #333333;
    font-size: 1.5em;
    font-weight: 600;
    margin: 0;
  }

  .setup__description {
    color: #7a7a7a;
    font-size: 1em;
    font-weight: 400;
    margin: 0;
  }

  .setup__body {
    display: flex;
    flex-direction: column;
    gap: 1.5625em;
  }

  .setup__textbox {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  .setup__footer {
    display: flex;
    flex-direction: column;
  }

  .setup__create-btn {
    background-color: #2d366d;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    height: 3.75em;
  }

  .setup__create-btn:hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgb(45 54 109 / 50%);
    transition: 0.3s ease-in-out;
  }
</style>
