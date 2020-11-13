import Vue from 'vue'
import App from './App.vue'
import HelloWorld from './components/HelloWorld';
import Example from './components/Example';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/example', component: Example },
  { path: '*', redirect: '/' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
