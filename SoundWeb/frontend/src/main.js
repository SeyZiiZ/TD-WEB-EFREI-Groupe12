import Alpine from "../node_modules/alpinejs/dist/module.esm.js";
import ValidationService from './scripts/ValiditationService.js';

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
            const response = await ApiService.loginUser(this.loginEmail, this.loginPassword);
            const token = response.data.token;
            document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}; Secure`;

            this.successMessage = response.data.message;
            if (this.successMessage) {
                setTimeout(() => {
                    window.location.href = "./home.html";
                }, 1500);
            }
        } catch (error) {
            console.log(error);
        }
    },

    clearMessages() {
        this.errorMessage = "";
        this.successMessage = "";
    }
}));

Alpine.data("RegisterData", () => ({
    registerEmail: "",
    registerPassword: "",
    errorMessage: "",
    successMessage: "",
    
    async handleRegister() {
        this.clearMessages();

        if (!this.registerEmail || !this.registerPassword) {
            this.errorMessage = "Tous les champs doivent être remplis pour s'inscrire.";
            return;
        }
        if (!ValidationService.isValidEmail(this.registerEmail)) {
            this.errorMessage = "Veuillez entrer une adresse e-mail valide.";
            return;
        }
        if (!ValidationService.isValidPassword(this.registerPassword)) {
            this.errorMessage = "Veuillez entrer un mot de passe valide";
            return;
        }

        try {
            const response = await ApiService.registerUser(this.registerEmail, this.registerPassword);
            
            this.successMessage = response.data.message;
            if(this.successMessage) {
                setTimeout(() => {
                    window.location.href = "./conexion.html";
                }, 1000);
            }
        } catch (error) {
            if (error.response) {
                this.errorMessage = error.response.data.message;
            } else if (error.request) {
                this.errorMessage = "Impossible de contacter le serveur";
            } else {
                this.errorMessage = "Une erreur s'est produite";
            }
        }
    },

    clearMessages() {
        this.errorMessage = "";
        this.successMessage = "";
    }
}));

Alpine.data("searchTracks", () => ({
    userQuery: "",
    async searchTracks(query) {
        console.log(query);
    }

/* 
        async searchTracks(query) {
        try {
            const response = await fetch(`https://api.soundcloud.com/tracks?q=${query}&client_id=${CLIENT_ID}`);
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    }
*/
}));

Alpine.start();