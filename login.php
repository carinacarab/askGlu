<?php 
    $host = "127.0.0.1";
    $port = "5433";
    $db = "askGluDB";
    $user = "admin"; 
    $pass = "c00ki32";


    $dsn = "pgsql:host=127.0.0.1; port=5433; dbname= askGluDB; user=admin; password=c00ki32";

    try{

        $dbconn = new PDO($dsn);
/*
        if($dbconn){
            echo "Connected to the <strong>$db</strong> database successfully!";
        } else {
            echo "nope";
        }

*/
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    
    $username = $request->username;
    $password = $request->password;

    $pass = md5($password);

    $auth_error = '';
    $resultus = '';

        
    try{

        $stmt = $dbconn->prepare("SELECT username, role FROM login WHERE username = :user AND password = :pass");

        $stmt->bindValue(':user', $username);
        $stmt->bindValue(':pass', $pass);

        //print_r($stmt);
        $result = array();

        if ($stmt->execute()) {
            $result = $stmt->fetchAll();
        }
            if(!empty($result)){
                foreach($result as $row) {
                    $resultus = $row['username'];
                    $resultro = $row['role'];

                }
                echo json_encode(
                        array(
                            "message" => "Successful Login.",
                            "token" => "lalalalalala",
                            "username" => $resultus
                        )
                );
                //echo json_encode($resultus);
                //foreach($result as $row) {
                //$_SESSION["username"] = $row["username"];
                //}
            } else {
                //$auth_error = 'Wrong username or password.';
                echo json_encode(array("message" => "Login failed."));
            }
            
            /*
            while ($row = $stmt->fetchAll()) {
                $result[] = $row;
            }
            echo json_encode($result); */
        //}else {
        //    $auth_error = 'Something wrong while executing.';
            //http_response_code(404);
        //}

        //$output = array('error' => $auth_error);

        //if(!empty($output)){
        //    echo json_encode($output);
        //}

    }catch (PDOException $e){
        echo $e->getMessage();
    }    

?>