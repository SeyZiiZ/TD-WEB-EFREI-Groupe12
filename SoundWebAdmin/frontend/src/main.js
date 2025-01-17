import Alpine from "../node_modules/alpinejs/dist/module.esm.js";
import ValidationService from './scripts/ValidationServices.js';
import ApiService from "./scripts/ApiServices.js";
import { genres, authors } from "./pages/composables/music.js";

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

document.addEventListener('alpine:init', () => {
    Alpine.data('authManager', () => ({
        authToken: null,

        init() {
            this.authToken = localStorage.getItem('authToken');
            if (!this.authToken) {
                window.location.href = '../../index.html';
            }
        },

        checkToken() {
            return this.authToken !== null;
        },

        logout() {
            localStorage.removeItem('authToken');
            window.location.href = '../../index.html';
        },
    }));
});

Alpine.data('formManager', () => ({
    showForm: false,
    toggleForm() {
        this.showForm = !this.showForm;
    }
}));

Alpine.data('AddMusicData', () => ({
    musicTitle: '',
    musicGenre: '',
    musicFolder: '',
    musicImage: '',
    selectedAuthor: '',
    genres: genres,
    authors: authors,
    errorMessage: '',
    successMessage: '',

    async handleAddMusic() {
        if (!this.musicTitle || !this.musicGenre || !this.musicFolder || !this.selectedAuthor || !this.musicImage) {
            alert('Veuillez remplir tous les champs !');
            return;
        }

        try {
            const response = await ApiService.addMusic(this.musicTitle, this.musicGenre, this.selectedAuthor, this.musicFolder, this.musicImage);
            
            const { Status, Message } = response.data;

            if (Status) {
                this.successMessage = Message;
            }
        } catch (e) {
            console.log(e);
        }
    },

    clearMessages() {
        this.errorMessage = "";
        this.successMessage = "";
    }
}));

document.addEventListener('alpine:init', () => {
    Alpine.data('Musics', () => ({
        musics: [],
        isLoading: false,
        error: null,

        async fetchMusics() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await ApiService.getAllMusics();
                this.musics = response.data.Musics;
            } catch (e) {
                this.error = "Erreur lors de la récupération des musiques.";
            } finally {
                this.isLoading = false;
            }
        }
    }));
});

Alpine.data('deleteMusic', () => ({
    async deleteMusic(id, name) {
        const confirmDelete = confirm(`Voulez-vous vraiment supprimer la musique : "${name}" ?`);
        if (!confirmDelete) return;

        try {
            const response = await ApiService.deleteMusic(id, name);
            const { Status, Message } = response.data;
            if (Status) {
                alert(`La musique "${name}" a été supprimée avec succès.`);
                window.location.reload();
            }
        } catch (e) {
            alert("Erreur lors de la tentative supression");
        }
    }
}));

Alpine.start();