<template>
  <div :class="[editDogState ? 'active' : '']" class="edit-dog">
    <md-switch v-model="editDogState">Edit Dog: {{ dog.name }} </md-switch>
    <div v-if="editDogState">
      <form id="app" @submit.prevent="editEditedDog">
        <p>
          <label for="name">Name</label>
          <input
            v-bind:id="dog.id + 'name'"
            v-model="name"
            type="text"
            name="name"
          />
        </p>

        <p>
          <label for="race">Race</label>
          <input
            v-bind:race="dog.id + 'race'"
            v-model="race"
            type="text"
            name="race"
          />
        </p>

        <p>
          <label for="type">Age</label>
          <input
            v-bind:age="dog.id + 'age'"
            v-model="age"
            type="text"
            name="age"
          />
        </p>

        <p>
          <input type="submit" value="Edit Dog" />
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditDog",
  props: {
    dog: {},
  },
  components: {},
  data() {
    return {
      editDogState: false,
      name: this.dog.name,
      race: this.dog.race,
      age: this.dog.age,
    };
  },
  mounted() {
    console.log("MOUNTED");
  },
  methods: {
    ...mapActions(["editDog"]),
    editEditedDog: function() {
      const payload = {
        name: this.name,
        race: this.race,
        age: this.age,
        id: +this.dog.id,
      };

      this.editDog(payload).then((response) => {
        if (
          response &&
          Object.keys(response).length > 0 &&
          +response.payload.id === +this.dog.id
        ) {
          this.editDogState = false;
        }
      });
    },
  },
  computed: {},
  watch: {
    editDogState(newVal, oldVal) {
      console.log("oeditDogState ldVal:", oldVal);
      console.log("editDogStatenewVal:", newVal);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.edit-dog {
  margin: 1rem 0;

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
