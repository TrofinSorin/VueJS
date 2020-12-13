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
        <label for="type">Age</label>
        <input id="type" v-model="age" type="text" name="age" />
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
        <p class="testtt">Name: {{ dog.name }}</p>
        <p>Rasa: {{ dog.race }}</p>
        <button @click="deleteDog(dog.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dogs",
  props: {
    msg: String,
  },
  components: {},
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

  &:hover {
    cursor: pointer;
    color: red;
  }
}

a {
  color: #42b983;
}
</style>
