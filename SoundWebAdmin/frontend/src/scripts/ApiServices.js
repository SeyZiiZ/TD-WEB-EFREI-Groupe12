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
        return await axios.post(`${BASE_URL_API}/api/deleteUser`, { userId });
    }
    static async getAllMusics() {
        return await axios.post(`${BASE_URL_API}/api/getAllMusics`);
    }
    static async addMusic(title, genre, auteur, fileName, fileImageName) {
        return await axios.post(`${BASE_URL_API}/api/addMusic`, {
            title,
            genre,
            auteur,
            fileName,
            fileImageName
        });
    }
    static async deleteMusic(id, name) {
        return await axios.post(`${BASE_URL_API}/api/deleteMusic`, {id, name});
    }
}

export default ApiService;