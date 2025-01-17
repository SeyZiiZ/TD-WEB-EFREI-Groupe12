<?php

namespace App\Controller;

use App\Model\UserModel;

class UserController {

    public function getAllUsers() {
        try {
            $userModel = new UserModel();
            $users = $userModel->getAllUsers();

            if (!$users) {
                http_response_code(404);
                return ["Message" => "Aucun utilisateur trouvé"];
            }

            return [
                "Message" => "Données utilisateur récupérées.",
                "Users" => $users,
            ];
        } catch (\Exception $e) {
            http_response_code(500);
            return ["Message" => "Erreur lors de la récupération des données utilisateur."];
        }
    }

    public function deleteUser($data) {
        try {
            $userId = $data['userId'];

            if (!isset($userId)) {
                http_response_code(400);
                return ["Message" => "L'ID de l'utilisateur est requis."];
            }
    
            $userModel = new UserModel();
            $userModel->deleteUser($userId);
    
            return [
                "Message" => "Utilisateur supprimé avec succès.",
            ];
        } catch (\Exception $e) {
            http_response_code(500);
            return ["Message" => "Erreur lors de la suppression des données utilisateur."];
        }
    }
    
}