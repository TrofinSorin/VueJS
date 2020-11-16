import HttpService from '../../services/HttpService';

const state = {
    dogs: []
}

const getters = {
    allDogs: (state) => state.dogs
}

const actions = {
    async fetchDogs({ commit }) {
        const response = await HttpService.get('/dogs');

        commit('setDogs', response.data)
    },
    async postDog({ commit }, payload) {
        const dogResponse = await HttpService.post('/dogs', payload);
        const responsePayload = {
            ...dogResponse.data,
            ...payload
        }

        commit('addDog', responsePayload)
    }
}

const mutations = {
    setDogs: (state, dogs) => (state.dogs = dogs),
    addDog: (state, dog) => state.dogs.push(dog)
}

export default {
    state,
    getters,
    actions,
    mutations
}