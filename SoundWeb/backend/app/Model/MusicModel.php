<?php

namespace App\Model;

use App\Data\Database;
use PDO;

class MusicModel {
    private $pdo;

    public function __construct() {
        $db = new Database();
        $this->pdo = $db->getConnection();
    }

    public function getAllMusics() {
        $stmt = $this->pdo->prepare("SELECT * FROM musics");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addMusic($title, $genre, $auteur, $fileName, $fileImageName) {
        $stmt = $this->pdo->prepare
        ("
            INSERT INTO musics (title, genre_id, author_id, file_path, image_path)
            VALUES (:title, :genre, :auteur, :fileName, :fileImageName)
        ");
        $stmt->execute([
            'title' => $title,
            'genre' => $genre,
            'auteur' => $auteur,
            'fileName' => $fileName,
            'fileImageName' => $fileImageName,
        ]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function deleteMusic($id, $name) {
        $stmt = $this->pdo->prepare
        ("
        DELETE FROM musics 
        WHERE id = :id 
        AND title = :name 
        ");
        $stmt->execute([
            'id' => $id,
            'name' => $name
        ]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}