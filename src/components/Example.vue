<template>
  <div class="hello">
    <!-- <ul id="example-1">
      <li v-for="(dog, index) in dogs"  v-bind:item="dog.name" v-bind:index="index"  v-bind:key="dog.id">
        {{ dog.name }}
      </li>
    </ul> -->

    <ul>
      <li v-for="todo in allTodos" v-bind:key='todo.id'>{{ todo.title }}</li>
    </ul>
  </div>
</template>

<script>
import HttpService from '../services/HttpService';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Example',
  props: {
    msg: String
  },
  data() { 
    return {
      message: 'Example',
      dogs: []
    }
  },
  created() {
    console.log('example process env', process.env);

    this.getDogs();
    this.fetchTodos();
  },
  methods: {
    ...mapActions(['fetchTodos']),
    getDogs: function() {
      HttpService.get('/dogs').then(response => {
        this.dogs = response.data;
      })
    },
    increment: function() {
      this.$store.commit('increment');
    }
  },
  computed: {
    ...mapGetters(['allTodos']),
    counter () {
      console.log('this.$store:', this.$store)
      return this.$store.state.counter
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
