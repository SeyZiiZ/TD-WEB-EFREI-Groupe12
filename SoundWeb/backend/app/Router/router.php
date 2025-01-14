<?php
namespace App\Router;

class Router {
    private $routes = [];

    public function add($path, $handler) {
        $this->routes[$path] = $handler;
    }

    public function dispatch($uri) {
        if (array_key_exists($uri, $this->routes)) {
            $requestData = $this->getRequestData();
            call_user_func($this->routes[$uri], $requestData);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "404 Not Found"]);
        }
    }
    
    private function getRequestData() {
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'GET') {
            return $_GET;
        } elseif (in_array($method, ['POST', 'PUT', 'PATCH'])) {
            return json_decode(file_get_contents('php://input'), true) ?? [];
        }
        return [];
    }
}

?>