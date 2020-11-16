import axios from 'axios';

const state = {
    todos: [
        {id: 1, title: 'Todo1'},
        {id: 2, title: 'Todo2'}
    ]
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        console.log('response todos', response);
    }
}
const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}