<?php
    include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if(isset($postdata) && !empty($postdata)) {

        $username = $request->username;
        $password = $request->password;

        $sql = 'SELECT userid FROM logincredentials WHERE username = :username AND password = :password';

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':password', $password);

        $result = $stmt->pg_execute();
        
        $login_check = pg_num_rows($result);

        if($login_check>0) {
            echo json_encode(
                array(
                    "message" => "Login Successful",
                )
            );
            http_response_code(200);
        } else {
            http_response_code(404);
        }
        
    }
?>