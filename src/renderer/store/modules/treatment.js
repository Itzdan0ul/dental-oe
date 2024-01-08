const state = {
  treatments: [],
};

const getters = {
  treatments: (state) => state.treatments,
};

const actions = {
  async getTreatments({ commit }) {
    const treatments = await window.electronAPI.invoke('treatment:fetch');
    
    commit('setTreatments', treatments);
  },
};

const mutations = {
  setTreatments(state, treatments) {
    state.treatments = treatments;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
