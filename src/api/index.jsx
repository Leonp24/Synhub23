import axios from "axios";

const Api = axios.create({
    baseURL: 'http://hub.fittern.site/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
    }
});

export default Api;