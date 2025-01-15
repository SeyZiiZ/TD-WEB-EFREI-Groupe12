import axios from '../../node_modules/axios/dist/esm/axios.js';

class SpotifyService {
    constructor(accessToken) {
        if (!accessToken) {
            throw new Error("Token d'accès manquant !");
        }
        this.accessToken = accessToken;
    }

    async playTrack(uri) {
        return await axios.put(
            "https://api.spotify.com/v1/me/player/play",
            { uris: [uri] },
            { headers: { Authorization: `Bearer ${this.accessToken}` } }
        );
    }

    async searchTracks(query, limit = 10) {
        return await axios.get(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
            { headers: { Authorization: `Bearer ${this.accessToken}` } }
        );
    }
}

export default SpotifyService;