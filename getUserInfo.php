<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    //print_r($request);

	$username = $request;

    $dataarray = [];

    try{
        $stmt = $dbconn->prepare("SELECT * FROM appusers WHERE username = :us");

        $stmt->bindValue(':us', $username);

        $person = array();

        if ($stmt->execute()) {
            $person = $stmt->fetchAll();
            //print_r($person);
        }


    } catch (PDOException $e){
        echo $e->getMessage();
    } 
    
    foreach ($person as $row){
        $firstN = $row['first'];
        $lastN = $row['last'];
        $username = $row['username'];
        $email = $row['email'];


        $data = array (
                "first" => $firstN,
                "last" => $lastN,
                "username"=> $username,
                "email"=> $email
                );
        array_push($dataarray, $data);
    }
    if(!empty($dataarray)){
        echo json_encode($dataarray);
    }

?>