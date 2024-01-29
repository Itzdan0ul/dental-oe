<script setup>
  import { onMounted, ref } from 'vue';

  const users = ref([]);
  const username = ref('Seleccionar Usuario');
  const password = ref('');

  onMounted(async () => {
    // const response = await fetch('app://assets/images/close.svg');

    // response.blob().then(console.log);

    // document.getElementById('patito').src = response.url;
    users.value = await window.electronAPI.invoke('user:fetch');
  });

  const login = async () => {
    const Swal = await import('sweetalert2');

    if (username.value === 'Seleccionar Usuario') {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un usuario.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }

    const user = {
      username: username.value,
      password: password.value,
    };

    const loginSuccessful = await window.electronAPI.invoke('login', user);

    if (!loginSuccessful) {
      Swal.default.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos.',
        showConfirmButton: false,
        timer: 2100,
      });

      return;
    }
  };
</script>

<template>
  <div class="login">
    <form class="login__form">
      <div class="login__header">
        <img src="../assets/images/logo@120x120.svg" alt="Logo del Servicio Dental.">
      </div>
      <main class="login__body">
        <div class="login__textbox">
          <label for="username">Usuario:</label>
          <select id="username" v-model="username">
            <option value="Seleccionar Usuario">Seleccionar Usuario</option>
            <option :value="user.username" v-for="(user, i) in users" :key="i">
              {{ user.username }}
            </option>
          </select>
        </div>
        <div class="login__textbox">
          <label for="password">Contraseña:</label>
          <input
            id="password"
            class="input"
            type="password"
            placeholder="Escribe tu contraseña"
            v-model.trim="password"
          />
        </div>
      </main>
      <div class="login__footer">
        <button
          class="login__create-btn"
          title="Ingresa a la aplicación como usuario."
          role="button"
          @click="login()"
        >
          Ingresar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .login {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .login__form {
    border: 0.0625rem solid rgba(0, 0, 0, 0.13);
    border-radius: 0.1875rem;
    display: flex;
    flex-direction: column;
    height: 38.75em;
    padding: 3.6875em 3.25em;
    justify-content: space-around;
    width: 30em;
  }

  .login__header {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .login__title {
    color: #333333;
    font-size: 1.5em;
    font-weight: 600;
    margin: 0;
  }

  .login__description {
    color: #7a7a7a;
    font-size: 1em;
    font-weight: 400;
    margin: 0;
  }

  .login__body {
    display: flex;
    flex-direction: column;
    gap: 1.5625em;
  }

  .login__textbox {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  .login__footer {
    display: flex;
    flex-direction: column;
  }

  .login__create-btn {
    background-color: #2d366d;
    border: 0;
    border-radius: 0.4375em;
    color: #fff;
    height: 3.75em;
  }

  .login__create-btn:hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgb(45 54 109 / 50%);
    transition: .3s ease-in-out;
  }
</style>
