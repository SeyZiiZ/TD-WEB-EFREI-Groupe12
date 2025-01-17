<?php
require_once __DIR__ . '/../vendor/autoload.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

use App\Router\Router;
use App\Controller\LoginController;
use App\Controller\RegisterController;
use App\Controller\UserController;
use App\Controller\MusicController;

$router = new Router();

$router->add('/', function () {
    echo json_encode(["message" => "Bienvenue sur l'API PHP"]);
});

$router->add('/api/register', function () {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $controller = new RegisterController();
    $response = $controller->register($data);

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->add('/api/login', function () {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new LoginController();
    $response = $controller->login($data);

    header('Content-Type: application/json');
    echo json_encode($response);

});

$router->add('/api/loginAdmin', function () {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new LoginController();
    $response = $controller->loginAdmin($data);

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->add('/api/getAllUsers', function () {
    $controller = new UserController();
    $response = $controller->getAllUsers();

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->add('/api/deleteUser', function () {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new UserController();
    $response = $controller->deleteUser($data);

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->add('/api/getAllMusics', function () {
    $controller = new MusicController();
    $response = $controller->getAllMusics();

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->add('/api/addMusic', function () {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new MusicController();
    $response = $controller->addMusic($data);

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->add('/api/deleteMusic', function () {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new MusicController();
    $response = $controller->deleteMusic($data);

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->dispatch($_SERVER['REQUEST_URI']);