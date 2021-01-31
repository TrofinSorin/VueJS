<template>
  <div class="masters">
    <h1>Masters with Dogs</h1>
    <form id="app" @submit.prevent="addMaster">
      <p>
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" name="name" />
      </p>

      <p>
        <label for="age">Age</label>
        <input id="age" v-model="age" type="text" name="age" />
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
    <div v-if="allMasters && allMasters.length > 0">
      <ul id="example-1">
        <li
          style="width: 100%"
          v-for="(master, index) in allMasters"
          v-bind:item="master.name"
          v-bind:index="index"
          v-bind:key="master.id"
        >
          <MasterProperty
            v-bind:name="'Name'"
            v-bind:master="master"
          ></MasterProperty>
          <MasterProperty
            v-bind:name="'Age'"
            v-bind:master="master"
          ></MasterProperty>
          <button @click="deleteMaster(+master.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2>No Masters Available</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import Dogs from "@components/Dogs";
import MasterProperty from "@shared/MasterProperty";

export default {
  name: "Masters",
  props: {
    msg: String,
  },
  components: {
    // Dogs,
    MasterProperty,
  },
  data() {
    return {
      name: null,
      race: null,
      age: null,
    };
  },
  created() {
    this.fetchMasters();
  },
  methods: {
    ...mapActions(["fetchMasters", "postMaster", "deleteMaster"]),
    addMaster: function() {
      const payload = {
        name: this.name,
        age: this.age,
      };

      this.postMaster(payload);

      this.reset();
    },

    reset() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
  },
  computed: {
    ...mapGetters(["allMasters"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #42b983;
}
</style>
