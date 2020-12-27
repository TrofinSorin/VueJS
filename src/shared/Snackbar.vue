<template>
  <div class="snackbar">
    <md-snackbar
      :class="[success ? 'success' : 'error']"
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="opened"
      @md-closed="closedCallback"
    >
      <h2>{{ message }}</h2>
    </md-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Snackbar",
  props: {
    name: String,
    dog: {},
  },
  components: {},
  data: () => ({
    opened: false,
    position: "center",
    duration: 4000,
  }),
  mounted() {
    this.$store.watch(
      // When the returned result changes...
      function(state) {
        return state.snackbar.opened;
      },
      // Run this callback
      this.openedListener
    );
  },
  methods: {
    ...mapActions(["triggerMessage"]),
    closedCallback: function() {
      this.triggerMessage({ message: "", opened: false, success: false });
    },
    openedListener: function(opened) {
      this.opened = opened;
      this.duration = this.message ? this.message.length * 100 : 3e2;
    },
  },
  computed: {
    ...mapGetters(["message", "success"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.snackbar {
  display: block;
}

.md-snackbar {
  top: 3%;

  &.error {
    background-color: red !important;
  }

  &.success {
    background-color: green !important;
  }
}
</style>
