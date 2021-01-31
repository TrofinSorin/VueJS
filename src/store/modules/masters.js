import HttpService from "../../services/HttpService";

const state = {
  masters: [],
};

const getters = {
  allMasters: (state) => state.masters,
};

const actions = {
  async fetchMasters({ commit }) {
    const response = await HttpService.get("/masters/read");

    commit("setMasters", response.data);
  },
  async postMaster({ commit }, payload) {
    const masterResponse = await HttpService.post(
      "/masters/master-create",
      payload
    );

    if (masterResponse) {
      const responsePayload = {
        ...payload,
      };

      commit("addMaster", responsePayload);

      this.dispatch("fetchMasters");
    }
  },
  async deleteMaster({ commit }, id) {
    await HttpService.deleteById(`/masters/delete`, id).then((response) => {
      if (response) {
        // When Delete Master 200 -> GET MASTERS
        commit("deleteMaster", id);
        this.dispatch("fetchMasters");
      }
    });
  },
  async editMaster({ commit }, payload) {
    let httpResponse = {};

    await HttpService.put(`/masters/edit-master`, payload).then((response) => {
      if (response) {
        commit("editMaster", payload);
        this.dispatch("fetchMasters");

        httpResponse.payload = payload;
        httpResponse.response = response;
      }
    });

    return httpResponse.response.status === 200 && httpResponse;
  },
  async patchMaster({ commit }, payload) {
    let httpResponse = {};

    await HttpService.patch(`/masters/patch-master`, payload).then(
      (response) => {
        if (response) {
          commit("patchMaster", payload);
          this.dispatch("fetchMasters");

          httpResponse.payload = payload;
          httpResponse.response = response;
        }
      }
    );

    return httpResponse.response.status === 200 && httpResponse;
  },
};

const mutations = {
  setMasters: (state, masters) => (state.masters = masters),
  addMaster: (state, master) => state.masters.push(master),
  deleteMaster: (state, id) => {
    const index = state.masters.findIndex((master) => master.id === id);

    state.masters.splice(index, 1);
  },
  editMaster: (state) => state,
  patchMaster: (state) => state,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
