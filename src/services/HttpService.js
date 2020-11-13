import axios from 'axios';

export default {
    API_PATH : process.env.VUE_APP_ENDPOINT,
    get(apiEndpoint, params){
      return axios.get(this.API_PATH + apiEndpoint, params) // <--- Need this to return the promise
        .then((response) => {
            return response;
        }).catch((error) => {
            console.log(error);
            throw error.response; // <-- use throw to be able to use catch
        });
    },
    post(apiEndpoint, payload, config){
      return axios.post(this.API_PATH + apiEndpoint, payload, config).then(response => {
        return response;
      });
    },
    put(apiEndpoint, payload) {
      return axios.put(this.API_PATH + apiEndpoint, payload).then(response => {
        return response;
      });
    },
    delete(apiEndpoint, payload) {
      return axios.delete(this.API_PATH + apiEndpoint, payload).then(response => {
        return response;
      });
    },
    patch(apiEndpoint, payload) {
      return axios.patch(this.API_PATH + apiEndpoint, payload).then(response => {
        return response;
      });
    }
}
