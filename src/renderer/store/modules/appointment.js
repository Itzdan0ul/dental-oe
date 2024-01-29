const state = {
  appointments: [],
};

const getters = {
  appointments: (state) => state.appointments,
};

const actions = {
  async getAppointments({ commit }) {
    const appointments = await window.electronAPI.invoke('appointment:fetch');
    
    commit('setAppointments', appointments);
  },
};

const mutations = {
  setAppointments(state, appointments) {
    state.appointments = appointments;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
