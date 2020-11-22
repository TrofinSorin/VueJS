import Vuex from "vuex";
import todos from "./modules/todos.js";
import dogs from "./modules/dogs.js";

const debug = process.env.NODE_ENV !== "production";
import { createLogger } from "vuex";

export const createStore = () =>
  new Vuex.Store({
    plugins: [createLogger()],
    modules: {
      todos,
      dogs,
    },
    strict: debug,
  });
