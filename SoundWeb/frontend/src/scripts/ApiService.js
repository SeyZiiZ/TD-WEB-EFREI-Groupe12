import axios from '../../node_modules/axios/dist/esm/axios.js';
import { BASE_URL_API } from '../../config.js';

class ApiService {

    static async loginUser(email, password) {
        return await axios.post(`${BASE_URL_API}/api/login`, { email, password });
    }
    
    static async getAllMusics() {
        return await axios.post(`${BASE_URL_API}/api/getAllMusics`);
    }
}

export default ApiService;