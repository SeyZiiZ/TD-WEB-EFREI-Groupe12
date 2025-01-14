<?php

namespace App\Composables;

class PasswordVerification {
    public static function isValidPassword($password) {
        // 8 caractères, une majuscule, un chiffre et un caractère spécial
        return preg_match('/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*?]{8,}$/', $password);
    }
}

?>