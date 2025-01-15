<?php

namespace App\Model;

use App\Data\Database;
use PDO;

class UserModel {
    private $pdo;

    public function __construct() {
        $db = new Database();
        $this->pdo = $db->getConnection();
    }

    public function registerUser($email, $password) {
        $stmt = $this->pdo->prepare("
        INSERT INTO users (email, password, created_at)
        VALUES (:email, :password, NOW())
        ");

        $stmt->execute([
            ':email' => $email,
            ':password' => $password,
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT email, password FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserById($id) {
        $stmt = $this->pdo->prepare("SELECT email FROM users WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllUsers() {
        $stmt = $this->pdo->prepare("SELECT * FROM users");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteUser($user_id) {
        if (!$user_id) {
            throw new Exception("L'ID de l'utilisateur est manquant.");
        }
    
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = :id;");
        $stmt->execute([':id' => $user_id]);
        return $stmt->rowCount();
    }
}