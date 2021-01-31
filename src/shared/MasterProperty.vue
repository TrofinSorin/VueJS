<template>
  <div class="master-property">
    <p v-if="!editing">{{ name }}: {{ showMasterName }}</p>
    <div v-else>
      <form id="app">
        <label for="type">Name</label>
        <input
          v-bind:id="master.id + 'name'"
          v-model="masterValue"
          type="text"
          name="masterValue"
        />
      </form>
    </div>
    <md-icon @click.native="editChangeClickHandler()">{{
      !editing ? "edit" : "highlight_off"
    }}</md-icon>
    <md-icon v-if="editing" @click.native="patchMasterProperty()">done</md-icon>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MasterProperty",
  props: {
    name: String,
    master: {},
  },
  components: {},
  data() {
    return {
      editing: false,
      masterValue: "",
    };
  },
  mounted() {
    this.masterValue = this.showMasterName;
  },
  methods: {
    ...mapActions(["patchMaster"]),
    editChangeClickHandler: function() {
      this.editing = !this.editing;
    },
    patchMasterProperty: function() {
      const payload = {
        id: +this.master.id,
        [this.name.toLowerCase()]: this.masterValue,
      };

      this.patchMaster(payload).then((response) => {
        if (response) {
          this.editing = false;
        }
      });
    },
  },
  computed: {
    showMasterName: function() {
      return this.master[this.name.toLowerCase()];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.master-property {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 1rem 0;

  .md-icon {
    display: flex;
    cursor: pointer;
    flex-basis: auto;
    margin: 0;
    width: auto;
  }

  &.active {
    border: 1px solid black;
  }
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;

  &:hover {
    cursor: pointer;
    color: red;
  }
}

a {
  color: #42b983;
}
</style>
