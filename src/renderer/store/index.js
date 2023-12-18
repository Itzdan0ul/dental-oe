import { createStore } from "vuex";
import patient from "./modules/patient";
import treatment from "./modules/treatment";

export const store = createStore({
  strict: true,
  modules: {
    patient,
    treatment,
  },
});
