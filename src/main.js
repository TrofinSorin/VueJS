import Vue from "vue";
import App from "./App.vue";
import Example from "./components/Example";
import Example2 from "./components/Example2";
import Masters from "./components/Masters";
import VueRouter from "vue-router";
import "es6-promise/auto";
import { createStore } from "./store/index.js";
import Vuex from "vuex";
import "normalize.css";
import "reset-css";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import axios from "axios";
import { getHeader } from "@services/WSSE/index";
import { HTTP_CODES } from "./constants/http-codes";
import Auth from "@services/Auth";
import { v4 as uuid_v4 } from "uuid";

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: "/", component: Masters },
  { path: "/example", component: Example },
  { path: "/example2", component: Example2 },
  { path: "*", redirect: "/" },
];

const store = createStore();
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: "history",
  routes: routes, // short for `routes: routes`
});

Vue.config.productionTip = false;

axios.interceptors.request.use(
  function(config) {
    config.headers = { ...config.headers };
    // you can also do other modification in config

    if (config.url.indexOf("secured") > 1) {
      const getUser = Auth.getUser();
      const accessToken = getUser.accessToken;
      const username = getUser.username;

      const header = getHeader(accessToken, username);
      config.headers["X-WSSE"] = header;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    // if (response.status === HTTP_CODES.OK) {
    // }

    switch (response.status) {
      case HTTP_CODES.OK:
        break;
      case HTTP_CODES.CREATED:
        store.dispatch("triggerMessage", {
          message: "Created succesfully",
          opened: true,
          success: true,
        });

        break;

      default:
        break;
    }

    return response;
  },
  async (error) => {
    const status =
      error.response && error.response.status ? error.response.status : null;

    console.log("status:", status);
    switch (status) {
      case HTTP_CODES.BAD_REQUEST:
        if (!Auth.getUserToken()) {
          const generatedUserToken = uuid_v4();

          Auth.generateUserToken(generatedUserToken);
        }

        store.dispatch("triggerMessage", {
          message: error?.response?.data?.message,
          opened: true,
          success: false,
        });

        break;
      case HTTP_CODES.UNAUTHORIZED:
      case HTTP_CODES.FORBIDDEN:
      case HTTP_CODES.NOT_FOUND:
      case HTTP_CODES.INTERNAL_SERVER_ERROR:
        break;

      default:
        store.dispatch("triggerMessage", {
          message: error?.response?.data?.message || "error",
          opened: true,
          success: false,
        });
        break;
    }

    return Promise.reject(error);
  }
);

new Vue({
  render: (h) => h(App),
  router,
  store: store,
  components: { App },
}).$mount("#app");
