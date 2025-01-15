<?php

namespace App\Data;

use PDO;
use Dotenv\Dotenv;

class Database {
    private $pdo;

    public function __construct() {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();

        $host = $_ENV['DB_HOST'];
        $dbname = $_ENV['DB_NAME'];
        $username = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];

        $dsn = "pgsql:host=$host;dbname=$dbname";
        
        $this->pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }

    public function getConnection() {
        return $this->pdo;
    }
}