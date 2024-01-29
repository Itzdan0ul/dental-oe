import { createStore } from 'vuex';
import patient from './modules/patient';
import treatment from './modules/treatment';
import expedient from './modules/expedient';
import appointment from './modules/appointment';
import medicalFile from './modules/medical-file';

export const store = createStore({
  strict: true,
  modules: {
    patient,
    treatment,
    expedient,
    appointment,
    medicalFile,
  },
});
