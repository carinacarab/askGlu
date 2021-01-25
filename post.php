<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    //print_r($request);

	$user = $request->user;
    $post = $request->post;

    try{
        $stmt = $dbconn->prepare("INSERT INTO postings(uname,thought) VALUES(:un, :th)");
        
        $stmt->bindValue(':un', $user);
        $stmt->bindValue(':th', $post);

        $stmt->execute();



    } catch (PDOException $e){
        echo $e->getMessage();
    } 

?>

