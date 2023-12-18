import App from './App.vue';
import { store } from '@/store';
import { router } from '@/router';
import { createApp, h } from 'vue';

// import '@/assets/js';
import 'moment/dist/locale/es';
import 'sweetalert2/src/sweetalert2.scss'

const app = createApp({
  render() {
    return h(App);
  },
});

app.use(store);
app.use(router);
app.mount('#v-app');
