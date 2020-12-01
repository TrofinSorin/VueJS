<template>
  <div class="hello">
    <h1>h1 test</h1>
    <ul>
      <li class="red-NICE" v-for="todo in allTodos" v-bind:key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Example",
  props: {
    msg: String,
  },
  data() {
    return {
      message: "Example",
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(["fetchTodos"]),
  },
  computed: {
    ...mapGetters(["allTodos"]),
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
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
