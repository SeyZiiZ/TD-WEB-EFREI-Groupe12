import axios from '../node_modules/axios/dist/esm/axios.js';
// mport axios from "../node_modules/axios/dist/esm/axios.min.js";

class ApiService {
    static async loginUser(email, password) {
        return await axios.post("http://localhost:8000/api/users/login", { email, password });
    }

    static async registerUser(name, email, password) {
        return await axios.post("http://localhost:3000/api/users/register", { name, email, password });
    }

    static async sendQuizResults(quizName, correctAnswers, email) {
        return await axios.post("http://localhost:3000/api/quiz/saveQuiz", {quizName, correctAnswers, email})
    }
}


export default ApiService;