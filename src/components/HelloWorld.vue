<template>
  <div class="hello">
    <p v-bind:title="url">{{ url }}</p>
    <p v-bind:title="title">{{ title }}</p>
    <p v-if="seen">seen</p>
    <p v-else>not seen</p>
    <li v-bind:key="todo.id" v-for="todo in todos">
      <p>{{ todo.text }}</p>
    </li>
    <p>{{ reversedMessage }}</p>
    <p>{{ now }}</p>
    <button v-on:click="reverseMessage">Reverse Message</button>
    <div id="demo">{{ fullName }}</div>
    <button v-on:click="fullNameSetter">fullNameSetter</button>

    <div id="watch-example">
      <p>
        Ask a yes/no question:
        <input v-model="question" />
      </p>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      message: "Hello Sorin",
      url: process.env.VUE_APP_URL,
      title: process.env.VUE_APP_TITLE,
      seen: true,
      todos: [
        { id: 1, text: "Learn JavaScript" },
        { id: 2, text: "Learn Vue" },
        { id: 3, text: "Build something awesome" },
      ],
      firstName: "Foo",
      lastName: "Bar",
      question: "",
      answer: "I cannot give you an answer until you ask a question!",
    };
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message
        .split("")
        .reverse()
        .join("");
    },
    fullNameSetter: function() {
      this.fullName = "WTF";
    },
    getAnswer: function() {
      if (this.question.indexOf("?") === -1) {
        this.answer = "Questions usually contain a question mark. ;-)";
        return;
      }
      this.answer = "Thinking...";
    },
  },
  computed: {
    // a computed getter
    reversedMessage: function() {
      // `this` points to the vm instance
      return this.message
        .split("")
        .reverse()
        .join("");
    },
    now: function() {
      return Date.now();
    },
    fullName: {
      // getter
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function(newValue) {
        console.log("newValue:", newValue);
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      },
    },
  },
  watch: {
    // whenever question changes, this function will run
    question: function(newQuestion, oldQuestion) {
      console.log("oldQuestion:", oldQuestion);
      console.log("newQuestion:", newQuestion);
      this.answer = "Waiting for you to stop typing...";
      this.getAnswer();
    },
  },
  created() {
    console.log("process.env", process.env);
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
