<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">My Vue App</span>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab to="/" md-label="Home" exact></md-tab>
            <md-tab md-label="Hello-World" to="/hello-world"></md-tab>
            <md-tab md-label="Example" to="/example"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false,
    init: false,
  }),
  mounted() {
    console.log("mounted", this.$route.path);
    this.init = true;
  },
  methods: {
    tabChanged: function(id) {
      console.log("id:", id);
      console.log("this.init", this.init);
      console.log("this.$route.path:", this.$route.path);
      this.$router.push(id);
    },
    isPath(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style lang="scss">
@import "./styles/_global";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.md-app {
  height: 100%;
}

.md-toolbar {
  padding: 1rem 0 !important;
}

.md-content {
  padding-top: 3rem !important;
}
</style>
