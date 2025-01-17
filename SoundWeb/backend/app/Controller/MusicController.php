<?php

namespace App\Controller;
use App\Model\MusicModel;

class MusicController {
    public function getAllMusics() {
        try {

            $musicModel = new MusicModel();
            $musics = $musicModel->getAllMusics();

            if (!$musics) {
                http_response_code(404);
                return ["Message" => "Aucune musique trouvé"];
            }
    
            return [
                "Message" => "Musiques recup",
                "Musics" => $musics,
                "Status" => true,
            ];

        } catch (\PDOException $e) {
            return [
                "Message" => "Erreur de récupération des musiques",
            ];
        }
    }

    public function addMusic($data) {
        try {
            
            if (!is_array($data) || 
            empty($data['title']) || 
            empty($data['genre']) || 
            empty($data['auteur']) || 
            empty($data['fileName']) || 
            empty($data['fileImageName'])) {
            return [
                "Message" => "Données invalides ou manquantes.",
                "Status" => false,
            ];
        }

            $musicModel = new MusicModel();
            $musics = $musicModel->addMusic(
                $data['title'],
                $data['genre'],
                $data['auteur'],
                $data['fileName'],
                $data['fileImageName'],
            );

            return [
                "Message" => "Musique ajouté",
                "Status" => true,
            ];
        } catch (\PDOException $e) {
            return [
                "Message" => "Erreur de l'ajout de la musique",
            ];
        }
    }

    public function deleteMusic($data) {

        try {
            $musicModel = new MusicModel();
            $music = $musicModel->deleteMusic($data['id'], $data['name']);

            return [
                "Message" => "Musique supprimé avec succès",
                "Status" => true,
            ];
        } catch(\PDOException $e) {
            return [
                "Message" => "Erreur lors de la suppression de la musique",
            ];
        }
    }
}