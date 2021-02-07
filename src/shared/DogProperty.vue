<template>
  <div class="dog-property">
    <p v-if="!editing">{{ name }}: {{ showDogName }}</p>
    <div v-else>
      <form id="app">
        <label for="type">Name</label>
        <input
          v-bind:id="dog.id + 'name'"
          v-model="dogValue"
          type="text"
          name="dogValue"
        />
      </form>
    </div>
    <md-icon @click.native="editChangeClickHandler()">{{
      !editing ? "edit" : "highlight_off"
    }}</md-icon>
    <md-icon v-if="editing" @click.native="patchDogProperty()">done</md-icon>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DogProperty",
  props: {
    name: String,
    mastersId: Number,
    dog: {},
  },
  components: {},
  data() {
    return {
      editing: false,
      dogValue: "",
    };
  },
  mounted() {
    this.dogValue = this.showDogName;
    console.log("DogProperty mastersId", this.mastersId);
  },
  methods: {
    ...mapActions(["patchDog"]),
    editChangeClickHandler: function() {
      this.editing = !this.editing;
    },
    patchDogProperty: function() {
      const payload = {
        id: +this.dog.id,
        [this.name.toLowerCase()]: this.dogValue,
        mastersId: this.mastersId,
      };

      this.patchDog(payload).then((response) => {
        if (response) {
          this.editing = false;
        }
      });
    },
  },
  computed: {
    showDogName: function() {
      return this.dog[this.name.toLowerCase()];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dog-property {
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
