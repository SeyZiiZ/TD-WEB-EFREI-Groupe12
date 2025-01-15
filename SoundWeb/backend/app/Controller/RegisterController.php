<?php

namespace App\Controller;

use App\Composables\EmailVerification;
use App\Composables\PasswordVerification;
use App\Data\Database;
use App\Model\UserModel;

class RegisterController {

    public function register($data) {
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
        if (empty($data['passwordChecker']) || $data['passwordChecker'] !== $data['password']) {
            return [
                "Message" => "Les mots de passe ne correspondent pas.",
            ];
        }

        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        try {

            $userModel = new UserModel();
            $user = $userModel->registerUser($data['email'], $hashedPassword);

            return [
                "Message" => "Inscription réussie, vous allez être redirigé vers la page de connexion.",
                "Status" => true,
            ];
        } catch (\PDOException $e) {
            return [
                "Message" => "Erreur lors de l'inscription",
                "Erreur" => $e
            ];
        }
    }
}