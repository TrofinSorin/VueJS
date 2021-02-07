<template>
  <div class="dogs">
    <form id="app" @submit.prevent="addDog">
      <p>
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" name="name" />
      </p>

      <p>
        <label for="type">Race</label>
        <input id="type" v-model="race" type="text" name="race" />
      </p>

      <p>
        <label for="age">Age</label>
        <input id="age" v-model="age" type="text" name="age" />
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
    <div
      class="dogs-loader"
      v-if="allDogs[this.mastersId] && allDogs[this.mastersId].loading"
    >
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else class="all-dogs">
      <div
        v-if="
          allDogs[this.mastersId] &&
            allDogs[this.mastersId].data &&
            allDogs[this.mastersId].data.length > 0
        "
      >
        <ul id="dog-list">
          <li
            class="dog-item"
            style="width: 100%"
            v-for="(dog, index) in allDogs[this.mastersId].data"
            v-bind:item="dog.name"
            v-bind:index="index"
            v-bind:key="dog.id"
          >
            <h2 class="dog-title">Dog</h2>
            <DogProperty
              v-bind:name="'Name'"
              v-bind:dog="dog"
              v-bind:mastersId="mastersId"
            ></DogProperty>
            <DogProperty
              v-bind:name="'Race'"
              v-bind:dog="dog"
              v-bind:mastersId="mastersId"
            ></DogProperty>
            <DogProperty
              v-bind:name="'Age'"
              v-bind:dog="dog"
              v-bind:mastersId="mastersId"
            ></DogProperty>
            <button class="delete-dog" @click="deleteDogClickHandler(dog.id)">
              Delete Dog
            </button>

            <!-- <EditDog v-bind:dog="dog"></EditDog> -->
          </li>
        </ul>
      </div>
      <div v-else>
        <h2>No Dogs Available</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import EditDog from "@shared/EditDog";
import DogProperty from "@shared/DogProperty";

export default {
  name: "Dogs",
  props: {
    msg: String,
    mastersId: Number,
  },
  components: {
    // EditDog,
    DogProperty,
  },
  data() {
    return {
      name: null,
      race: null,
      age: null,
    };
  },
  created() {
    this.fetchDogs(this.mastersId);
  },
  methods: {
    ...mapActions(["fetchDogs", "postDog", "deleteDog"]),
    addDog: function() {
      const payload = {
        name: this.name,
        race: this.race,
        age: this.age,
        mastersId: this.mastersId,
      };

      this.postDog(payload);
      this.reset();
    },

    deleteDogClickHandler: function(dogId) {
      const payload = {
        id: dogId,
        mastersId: this.mastersId,
      };

      this.deleteDog(payload);
    },

    reset() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
  },
  computed: {
    ...mapGetters(["allDogs"]),
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

.dogs-loader {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}

#dog-list {
  display: flex;
  flex-direction: column;

  .dog-item {
    border: 1px solid black;
    border-radius: 2rem;
    margin-top: 1rem;
  }

  .delete-dog {
    border-radius: 2rem;
    width: 100%;
  }

  .dog-title {
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }
}

li {
  display: inline-block;
}

a {
  color: #42b983;
}
</style>
