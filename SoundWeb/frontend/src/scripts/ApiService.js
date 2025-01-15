import axios from '../../node_modules/axios/dist/esm/axios.js';
import { BASE_URL_API } from '../../config.js';

class ApiService {

    static async loginUser(email, password) {
        return await axios.post(`${BASE_URL_API}/api/login`, { email, password });
    }

    static async deleteUser(userId) {
        return await axios.delete(`${BASE_URL_API}/api/deleteUser`, {
            data: { userId }
        });
    }
}

export default ApiService;