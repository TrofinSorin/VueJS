<template>
  <div class="masters">
    <h1>Masters with Dogs</h1>
    <form id="app" @submit.prevent="addMaster">
      <p>
        <label for="name">Master Name</label>
        <input id="name" v-model="name" type="text" name="name" />
      </p>

      <p>
        <label for="age">Master Age</label>
        <input id="age" v-model="age" type="text" name="age" />
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
    <div v-if="allMasters && allMasters.length > 0">
      <div class="list">
        <md-list :md-expand-single="expandSingle">
          <md-list-item
            class="master-item"
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
            <button
              v-bind:style="{ marginBottom: '1rem' }"
              @click.stop="expandMaster(master.id)"
            >
              {{ !expanded[master.id] ? "See Dogs List" : "Close Dogs List" }}
            </button>
            <button @click="deleteMaster(+master.id)">
              Delete Master
            </button>
            <div v-if="expanded[master.id]">
              <Dogs v-bind:mastersId="+master.id"></Dogs>
            </div>
          </md-list-item>
        </md-list>
      </div>
    </div>

    <div v-else>
      <h2>No Masters Available</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dogs from "@components/Dogs";
import MasterProperty from "@shared/MasterProperty";

export default {
  name: "Masters",
  props: {
    msg: String,
  },
  components: {
    Dogs,
    MasterProperty,
  },
  data() {
    return {
      name: null,
      race: null,
      age: null,
      expanded: {},
      expandSingle: false,
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
    expandMaster: function(masterId) {
      const expandedValues = Object.assign({}, this.expanded);

      expandedValues[masterId] = !expandedValues[masterId] ? true : false;

      this.expanded = expandedValues;
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

.master-item {
  border: 0.1rem solid black;
  border-radius: 20px;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  padding: 2rem;
  width: 60%;
}

.md-list-item-container {
  border: 0;
}

.list {
  margin-top: 4rem;

  .master-expanded-container {
    margin-top: 2rem;
  }

  ::v-deep .md-list-item-content {
    padding-left: 1rem !important;
    padding-bottom: 1rem;
  }
  ::v-deep .md-list-item-content {
    display: flex;
    flex-direction: column;
  }

  ::v-deep .md-list-expand-icon {
    margin: 2rem 0 2rem 0 !important;
  }
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
