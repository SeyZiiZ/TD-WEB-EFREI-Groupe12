import axios from '../../node_modules/axios/dist/esm/axios.js';
import { BASE_URL_API } from '../../config.js';

class ApiService {
    static async loginAdmin(email, password) {
        return await axios.post(`${BASE_URL_API}/api/loginAdmin`, { email, password });
    }
    static async getAllUsers() {
        return await axios.post(`${BASE_URL_API}/api/getAllUsers`);
    }
    static async deleteUser(userId) {
        return await axios.delete(`${BASE_URL_API}/api/deleteUser/${userId}`);
    }
}

export default ApiService;