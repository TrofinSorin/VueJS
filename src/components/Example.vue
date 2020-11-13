<template>
  <div class="hello">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import HttpService from '../services/HttpService';

export default {
  name: 'Example',
  props: {
    msg: String
  },
  data() { 
    return {
      message: 'Example',
    }
  },
  created() {
    console.log('example process env', process.env);
    this.getDogs();
  },
  methods: {
    getDogs: function() {
      HttpService.get('/dogs').then(response => {
        console.log('response:', response)

      })
    }
  }
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
