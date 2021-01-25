<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    //print_r($request);

	$username = $request->user;
    $newpassword = $request->newp;

    $newp = md5($newpassword);

    //print_r($request);
    try{
        $stmt = $dbconn->prepare("UPDATE login SET password = :pw WHERE username = :us");

        $stmt->bindValue(':pw', $newp);
        $stmt->bindValue(':us', $username);

        $person = array();

        $stmt->execute();


    } catch (PDOException $e){
        echo $e->getMessage();
    } 

?>