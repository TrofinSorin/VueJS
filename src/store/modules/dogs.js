import HttpService from "../../services/HttpService";

const state = {
  dogs: [],
};

const getters = {
  allDogs: (state) => state.dogs,
};

const actions = {
  async fetchDogs({ commit }) {
    const response = await HttpService.get("/dogs/read");

    commit("setDogs", response.data);
  },
  async postDog({ commit }, payload) {
    const dogResponse = await HttpService.post("/dogs/dog-create", payload);

    if (dogResponse) {
      const responsePayload = {
        ...payload,
      };

      commit("addDog", responsePayload);

      this.dispatch("fetchDogs");
    }
  },
  async deleteDog({ commit }, id) {
    await HttpService.deleteById(`/dogs/delete`, id).then((response) => {
      if (response) {
        // When Delete Dog 200 -> GET DOGS
        commit("deleteDog", id);
        this.dispatch("fetchDogs");
      }
    });
  },
};

const mutations = {
  setDogs: (state, dogs) => (state.dogs = dogs),
  addDog: (state, dog) => state.dogs.push(dog),
  deleteDog: (state, id) => {
    const index = state.dogs.findIndex((dog) => dog.id === id);

    state.dogs.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
