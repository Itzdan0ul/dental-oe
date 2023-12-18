const state = {
  patients: [],
};

const getters = {
  patients: (state) => state.patients,
};

const actions = {
  async getPatients({ commit }) {
    const patients = await window.electronAPI.invoke('patient:fetch');

    commit('setPatients', patients);
  },
};

const mutations = {
  setPatients(state, patients) {
    state.patients = patients;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
