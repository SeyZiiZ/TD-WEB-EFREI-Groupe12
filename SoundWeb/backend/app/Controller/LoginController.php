<?php
namespace App\Controller;

use App\Composables\EmailVerification;
use App\Composables\PasswordVerification;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class LoginController {

    private $secretKey = "cleSecreteJWT";

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