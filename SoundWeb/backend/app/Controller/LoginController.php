<?php
namespace App\Controller;

use App\Composables\EmailVerification;
use App\Composables\PasswordVerification;
use App\Model\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class LoginController {

    private $secretKey = "cleSecreteJWT";
    private $spotifyClientId = "c1bdeb6b44304e7b969177000aef0dcc";
    private $spotifyRedirectUri = "http://127.0.0.1:5500/frontend/src/pages/home.html";

    public function login($data) {
        if (empty($data['email']) || empty($data['password'])) {
            return [
                "Message" => "Email et mot de passe requis.",
            ];
        }
        if (empty($data['email']) || !EmailVerification::isValidEmail($data['email'])) {
            return [
                "Message" => "Veuillez fournir un email valide.",
            ];
        }
        if (empty($data['password']) || !PasswordVerification::isValidPassword($data['password'])) {
            return [
                "Message" => "Le mot de passe saisie n'est pas valide.",
            ];
        }

        try {

            $userModel = new UserModel();
            $user = $userModel->getUserByEmail($data['email']);

            if (!$user || !password_verify($data['password'], $user['password'])) {
                return [
                    "Message" => "Email ou mot de passe incorrect.",
                ];
            }

            $payload = [
                "iss" => "http://localhost:8000",
                "aud" => "http://localhost:3000",
                "iat" => time(),
                "exp" => time() + 36000,
                "userId" => $user['id'],
                "email" => $user['email']
            ];

            $jwt = JWT::encode($payload, $this->secretKey, 'HS256');

            $spotifyAuthUrl = $this->generateSpotifyAuthUrl();

            return [
                "Message" => "Connexion réussie.",
                "Status" => true,
                "token" => $jwt,
                "spotifyAuthUrl" => $spotifyAuthUrl
            ];

        } catch(\PDOException $e) {
            return [
                "Message" => "Erreur lors de la connexion",
            ];
        }
    }

    private function generateSpotifyAuthUrl() {
        $scopes = implode(' ', [
            "streaming",
            "user-read-private",
            "user-read-email",
            "user-read-playback-state",
            "user-modify-playback-state"
        ]);

        $url = "https://accounts.spotify.com/authorize?" . http_build_query([
            "client_id" => $this->spotifyClientId,
            "response_type" => "token",
            "redirect_uri" => $this->spotifyRedirectUri,
            "scope" => $scopes
        ]);

        return $url;
    }

    public function loginAdmin($data) {
        if (empty($data['email']) || empty($data['password'])) {
            return [
                "Message" => "Email et mot de passe requis.",
            ];
        }
        if (empty($data['email']) || !EmailVerification::isValidEmail($data['email'])) {
            return [
                "Message" => "Veuillez fournir un email valide.",
            ];
        }
        if (empty($data['password']) || !PasswordVerification::isValidPassword($data['password'])) {
            return [
                "Message" => "Le mot de passe saisie n'est pas valide.",
            ];
        }

        try {

            $userModel = new UserModel();
            $user = $userModel->getUserByEmail($data['email']);

            if (!$user || !password_verify($data['password'], $user['password'])) {
                return [
                    "Message" => "Email ou mot de passe incorrect.",
                ];
            }

            $payload = [
                "iss" => "http://localhost:8000",
                "aud" => "http://localhost:3000",
                "iat" => time(),
                "exp" => time() + 3600,
                "userId" => $user['id'],
                "email" => $user['email']
            ];

            $jwt = JWT::encode($payload, $this->secretKey, 'HS256');

            return [
                "Message" => "Connexion réussie.",
                "Status" => true,
                "token" => $jwt
            ];

        } catch(\PDOException $e) {
            return [
                "Message" => "Erreur lors de la connexion",
            ];
        }
    }
}

?>