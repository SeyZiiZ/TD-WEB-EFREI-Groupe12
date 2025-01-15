import Alpine from "../node_modules/alpinejs/dist/module.esm.js";
import ValidationService from './scripts/ValiditationService.js';
import ApiService from "./scripts/ApiService.js";
import SpotifyService from './scripts/SpotifySerice.js';
import axios from '../node_modules/axios/dist/esm/axios.js';

window.Alpine = Alpine;

Alpine.data("loginData", () => ({
    loginEmail: "",
    loginPassword: "",
    spotifyAuthUrl: "",
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

            const { token, spotifyAuthUrl, Message } = response.data;

            this.successMessage = Message;

            if (token) {
                localStorage.setItem("authToken", token);
                this.successMessage = Message || "Connexion réussie.";

                if (spotifyAuthUrl) {
                    this.spotifyAuthUrl = spotifyAuthUrl;
                    setTimeout(() => {
                        window.location.href = spotifyAuthUrl;
                    }, 1500);
                } else {
                    setTimeout(() => {
                        window.location.href = "./home.html";
                    }, 1500);
                }
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
        this.spotifyAuthUrl = "";
    }
}));

Alpine.data("RegisterData", () => ({
    registerEmail: "",
    registerPassword: "",
    registerPasswordVerification: "",
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
        if (this.registerPassword !== this.registerPasswordVerification) {
            this.errorMessage = "Les mots de passe ne correspondents pas Alpine";
            return
        }

        try {
            const response = await ApiService.registerUser(this.registerEmail, this.registerPassword, this.registerPasswordVerification);
            
            const { Message } = response.data;
            this.successMessage = Message;

            if(Message) {
                setTimeout(() => {
                    window.location.href = "./pages/conexion.html";
                }, 2000);
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


document.addEventListener('alpine:init', () => {
    Alpine.data('spotifyComponent', () => ({
        spotifyService: null,
        accessToken: null,
        player: null,
        deviceId: null,
        userQuery: "",
        allResults: [],
        displayedResults: [],
        itemsPerPage: 6,
        currentPage: 0,
        trackPlayingState: {},
        currentPlayingUri: null,

        async init() {
            console.log('Initialisation du composant...');
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.replace("#", ""));
            this.accessToken = params.get("access_token");

            if (!this.accessToken) {
                alert("Token d'accès manquant. Connectez-vous via Spotify.");
                return;
            }

            this.spotifyService = new SpotifyService(this.accessToken);
            this.initializePlayer();
        },

        initializePlayer() {
            console.log('Initialisation du player...');
            window.onSpotifyWebPlaybackSDKReady = () => {
                console.log('SDK Spotify prêt');
                this.player = new Spotify.Player({
                    name: 'SoundWeb Player',
                    getOAuthToken: cb => { cb(this.accessToken); },
                    volume: 0.8,
                });

                this.player.addListener('ready', ({ device_id }) => {
                    console.log('Lecteur prêt avec Device ID:', device_id);
                    this.deviceId = device_id;
                    this.transferPlayback(device_id);
                });

                this.player.addListener('not_ready', ({ device_id }) => {
                    console.log('Lecteur non prêt avec Device ID:', device_id);
                });

                this.player.connect();
            };
        },

        async transferPlayback(deviceId) {
            try {
                await axios.put(
                    'https://api.spotify.com/v1/me/player',
                    {
                        device_ids: [deviceId],
                        play: false
                    },
                    {
                        headers: { Authorization: `Bearer ${this.accessToken}` }
                    }
                );
                console.log('Transfert de lecture réussi vers:', deviceId);
            } catch (error) {
                console.error('Erreur lors du transfert:', error);
            }
        },

        async playTrack(uri) {
            try {
                // Si une autre piste est en lecture, la mettre en pause
                if (this.currentPlayingUri && this.currentPlayingUri !== uri) {
                    await this.pauseTrack(this.currentPlayingUri);
                }

                await axios.put(
                    "https://api.spotify.com/v1/me/player/play",
                    { uris: [uri] },
                    { 
                        headers: { Authorization: `Bearer ${this.accessToken}` },
                        params: { device_id: this.deviceId }
                    }
                );

                // Met à jour l'état de lecture
                this.trackPlayingState[uri] = true;
                this.currentPlayingUri = uri; // Marque cette piste comme en lecture
                console.log(`Lecture en cours : ${uri}`);
            } catch (error) {
                console.error("Erreur lors de la lecture :", error.response?.data || error.message);
            }
        },

        async pauseTrack(uri) {
            try {
                await axios.put(
                    "https://api.spotify.com/v1/me/player/pause",
                    {},
                    { 
                        headers: { Authorization: `Bearer ${this.accessToken}` },
                        params: { device_id: this.deviceId }
                    }
                );

                // Met à jour l'état de lecture
                this.trackPlayingState[uri] = false;

                // Si c'était la piste actuellement en lecture, la désactiver
                if (this.currentPlayingUri === uri) {
                    this.currentPlayingUri = null;
                }

                console.log(`Lecture mise en pause : ${uri}`);
            } catch (error) {
                console.error("Erreur lors de la mise en pause :", error.response?.data || error.message);
            }
        },

        togglePlayPause(trackUri) {
            if (this.trackPlayingState[trackUri]) {
                this.pauseTrack(trackUri);
            } else {
                this.playTrack(trackUri);
            }
        },

        async searchTracks() {
            if (!this.spotifyService) {
                alert("Service Spotify non initialisé.");
                return;
            }

            try {
                const response = await this.spotifyService.searchTracks(this.userQuery, 50);
                this.allResults = response.data.tracks.items;

                // Initialiser l'état de lecture pour chaque piste
                this.trackPlayingState = this.allResults.reduce((state, track) => {
                    state[track.uri] = false;
                    return state;
                }, {});

                this.currentPage = 0;
                this.loadMore();
            } catch (error) {
                console.error("Erreur lors de la recherche :", error);
            }
        },

        loadMore() {
            const start = this.currentPage * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.displayedResults = this.allResults.slice(0, end);
            this.currentPage++;
        },

        clearSearch() {
            this.userQuery = "";
            this.allResults = [];
            this.displayedResults = [];
            this.currentPage = 0;
            this.trackPlayingState = {};
            this.currentPlayingUri = null;
        },
    }));
});


Alpine.start();