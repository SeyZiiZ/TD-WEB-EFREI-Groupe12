<?php

namespace App\Composables;

class EmailVerification {
    public static function isValidEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
}

?>