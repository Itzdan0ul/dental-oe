const state = {
  expedients: [],
};

const getters = {
  expedients: (state) => state.expedients,
};

const actions = {
  async getExpedients({ commit }) {
    const expedients = await window.electronAPI.invoke('expedient:fetch');

    console.log('Expedients fetched from DB: ', expedients);

    commit('setExpedients', expedients);
  },
};

const mutations = {
  setExpedients(state, expedients) {
    state.expedients = expedients;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
