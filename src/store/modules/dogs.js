import HttpService from "../../services/HttpService";

const state = {
  dogs: {},
};

const getters = {
  allDogs: (state) => state.dogs,
};

const actions = {
  async fetchDogs({ commit }, mastersId) {
    console.log("masterId:", mastersId);
    const params = {
      mastersId,
    };

    commit("setLoading", { value: true, mastersId });

    const response = await HttpService.get("/dogs/read", params);
    const payload = { data: response.data, mastersId };

    commit("setDogs", payload);
    commit("setLoading", { value: false, mastersId });
  },
  async postDog({ commit }, payload) {
    const dogResponse = await HttpService.post("/dogs/dog-create", payload);

    if (dogResponse) {
      const responsePayload = {
        ...payload,
      };

      commit("addDog", responsePayload);

      this.dispatch("fetchDogs", payload.mastersId);
    }
  },
  async deleteDog({ commit }, payload) {
    console.log("deleteDog mastersId:", payload.mastersId);
    await HttpService.deleteById(`/dogs/delete`, payload.id).then(
      (response) => {
        if (response) {
          // When Delete Dog 200 -> GET DOGS
          commit("deleteDog", payload.id);
          this.dispatch("fetchDogs", payload.mastersId);
        }
      }
    );
  },
  async editDog({ commit }, payload) {
    let httpResponse = {};

    await HttpService.put(`/dogs/edit-dog`, payload).then((response) => {
      if (response) {
        commit("editDog", payload);
        this.dispatch("fetchDogs");

        httpResponse.payload = payload;
        httpResponse.response = response;
      }
    });

    return httpResponse.response.status === 200 && httpResponse;
  },
  async patchDog({ commit }, payload) {
    let httpResponse = {};

    await HttpService.patch(`/dogs/patch-dog`, payload).then((response) => {
      if (response) {
        commit("patchDog", payload);
        this.dispatch("fetchDogs", payload.mastersId);

        httpResponse.payload = payload;
        httpResponse.response = response;
      }
    });

    return httpResponse.response.status === 200 && httpResponse;
  },
};

const mutations = {
  setDogs: (state, payload) => {
    const dogs = Object.assign({}, state.dogs);
    dogs[payload.mastersId] = {
      data: payload.data,
      loading: false,
    };

    state.dogs = { ...dogs };
  },
  // addDog: (state, dog) => state.dogs.push(dog),
  // deleteDog: (state, id) => {
  //   const index = state.dogs.findIndex((dog) => dog.id === id);

  //   state.dogs.splice(index, 1);
  // },

  addDog: (state) => state,
  deleteDog: (state) => state,
  editDog: (state) => state,
  patchDog: (state) => state,
  setLoading: (state, payload) => {
    const dogs = Object.assign({}, state.dogs);

    dogs[payload.mastersId] = {
      data: dogs[payload.mastersId] && dogs[payload.mastersId].data,
      loading: payload.value,
    };

    state.dogs = { ...dogs };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
