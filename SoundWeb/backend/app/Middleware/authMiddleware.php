<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function authMiddleware() {
    $headers = getallheaders();

    if (empty($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["Message" => "JWT manquant."]);
        exit;
    }

    $jwt = str_replace('Bearer ', '', $headers['Authorization']);
    $secretKey = "cleSecreteJWT";

    try {
        return JWT::decode($jwt, new Key($secretKey, 'HS256'));
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["Message" => "JWT invalide."]);
        exit;
    }
}