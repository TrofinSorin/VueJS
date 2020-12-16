const getDefaultState = () => {
  return {
    message: "",
    opened: false,
    success: false,
  };
};

const state = getDefaultState();

const getters = {
  message: (state) => state.message,
  opened: (state) => state.opened,
  success: (state) => state.success,
};

const actions = {
  triggerMessage({ commit }, payload) {
    commit("setMessage", payload?.message);
    commit("setOpened", payload?.opened);
    commit("setSuccess", payload?.success);
  },
};

const mutations = {
  setMessage: (state, message) => {
    state.message = message;
  },
  setOpened: (state, opened) => {
    state.opened = opened;
  },
  setSuccess: (state, success) => {
    state.success = success;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
