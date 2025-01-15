import Alpine from "../node_modules/alpinejs/dist/module.esm.js";
import ValidationService from './scripts/ValidationServices.js';
import ApiService from "./scripts/ApiServices.js";

window.Alpine = Alpine;

Alpine.data("loginData", () => ({
    loginEmail: "",
    loginPassword: "",
    errorMessage: "",
    successMessage: "",

    async handleLogin() {
        this.clearMessages();
        
        if (!this.loginEmail || !this.loginPassword) {
            this.errorMessage = "Tous les champs doivent être remplis pour se connecter.";
            return;
        }
        
        if (!ValidationService.isValidEmail(this.loginEmail)) {
            this.errorMessage = "Veuillez entrer une adresse e-mail valide.";
            return;
        }
        
        if (!ValidationService.isValidPassword(this.loginPassword)) {
            this.errorMessage = "Veuillez entrer un mot de passe valide";
            return;
        }
        
        try {
            const response = await ApiService.loginAdmin(this.loginEmail, this.loginPassword);

            const { token, Message } = response.data;
            this.successMessage = Message;

            if(token) {
                localStorage.setItem("authToken", token);
                setTimeout(() => {
                    window.location.href = "./src/pages/dashboard.html";
                }, 1500);
            }

        } catch (error) {
            if (error.response) {
                this.errorMessage = error.response.data.message;
            }
        }
    },

    clearMessages() {
        this.errorMessage = "";
        this.successMessage = "";
    }
}));

Alpine.data('adminPanel', () => ({
    logout() {
        window.location.href = '../../index.html';
    }
}));

document.addEventListener('alpine:init', () => {
    Alpine.data('usersList', () => ({
        users: [],
        isLoading: false,
        error: null,

        async fetchUsers() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await ApiService.getAllUsers();
                if (response.data.Users) {
                    this.users = response.data.Users;
                } else {
                    this.error = 'Aucun utilisateur trouvé.';
                }
            } catch (err) {
                this.error = 'Erreur lors de la récupération des utilisateurs.';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        async deleteUser(userId) {
            try {
                const response = await ApiService.deleteUser(userId);
                if (response.status === 200) {
                    window.location.reload();
                } else {
                    console.error('Erreur lors de la suppression');
                }
            } catch (err) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', err);
            }
        },

        init() {
            this.fetchUsers();
        }
    }));
});

Alpine.start();