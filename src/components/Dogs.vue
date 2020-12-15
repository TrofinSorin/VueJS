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
    <ul id="example-1">
      <li
        style="width: 100%"
        v-for="(dog, index) in allDogs"
        v-bind:item="dog.name"
        v-bind:index="index"
        v-bind:key="dog.id"
      >
        <DogProperty v-bind:name="'Name'" v-bind:dog="dog"></DogProperty>
        <DogProperty v-bind:name="'Race'" v-bind:dog="dog"></DogProperty>
        <DogProperty v-bind:name="'Age'" v-bind:dog="dog"></DogProperty>
        <button @click="deleteDog(dog.id)">Delete</button>

        <EditDog v-bind:dog="dog"></EditDog>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditDog from "@shared/EditDog";
import DogProperty from "@shared/DogProperty";

export default {
  name: "Dogs",
  props: {
    msg: String,
  },
  components: {
    EditDog,
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
    this.fetchDogs();
  },
  methods: {
    ...mapActions(["fetchDogs", "postDog", "deleteDog"]),
    addDog: function() {
      const payload = {
        name: this.name,
        race: this.race,
        age: this.age,
      };

      this.postDog(payload);
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

li {
  display: inline-block;
}

a {
  color: #42b983;
}
</style>
