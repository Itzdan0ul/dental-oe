const state = {
  medicalFiles: [],
};

const getters = {
  medicalFiles: (state) => state.medicalFiles,
};

const actions = {
  async getMedicalFiles({ commit }, expedientId) {
    const medicalFiles = await window.electronAPI.invoke('medicalFile:fetch', expedientId);

    console.log(medicalFiles);

    commit('setMedicalFiles', medicalFiles);
  },
};

const mutations = {
  setMedicalFiles(state, medicalFiles) {
    state.medicalFiles = medicalFiles;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
