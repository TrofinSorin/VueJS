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
// import "reset-css";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

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

new Vue({
  render: (h) => h(App),
  router,
  store: createStore(),
  components: { App },
}).$mount("#app");
