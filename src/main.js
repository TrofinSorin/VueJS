import Vue from "vue";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld";
import Example from "./components/Example";
import Dogs from "./components/Dogs";
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
import { uuid } from "uuidv4";

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: "/hello-world", component: HelloWorld },
  { path: "/example", component: Example },
  { path: "/", component: Dogs },
  { path: "*", redirect: "/" },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: "history",
  routes, // short for `routes: routes`
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
        // dispatch(snackbarActions.setSnackbarMessage('MESSAGE FROM SERVICE', 'success'));

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
          const generatedUserToken = uuid();

          Auth.generateUserToken(generatedUserToken);
        }

        break;
      case HTTP_CODES.UNAUTHORIZED:
      case HTTP_CODES.FORBIDDEN:
      case HTTP_CODES.NOT_FOUND:
      case HTTP_CODES.INTERNAL_SERVER_ERROR:
        break;

      default:
        break;
    }

    // dispatch(
    //   snackbarActions.setSnackbarMessage(
    //     error.response &&
    //       error.response.data &&
    //       error.response.data.errors &&
    //       error.response.data.errors.userMessage
    //       ? error.response.data.errors.userMessage
    //       : "error",
    //     "error"
    //   )
    // );

    return Promise.reject(error);
  }
);

new Vue({
  render: (h) => h(App),
  router,
  store: createStore(),
  components: { App },
}).$mount("#app");
