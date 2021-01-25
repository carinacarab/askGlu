<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");

    //if(isset($postdata) && !empty($postdata)) {

    $request = json_decode($postdata);

    //sanitizing
    $fName = $request->fName;
    $lName = $request->lName;
    $email= $request->email;
    $username = $request->username;
    $password = $request->password;
    $role = $request->role;

        
    try{
        $stmt = $dbconn->prepare("INSERT INTO appusers(first,last,username,email) VALUES(:fn,:ln,:user,:em)");
        
        $stmt->bindValue(':fn', $fName);
        $stmt->bindValue(':ln', $lName);
        $stmt->bindValue(':user', $username);
        $stmt->bindValue(':em', $email);

        $stmt->execute();


    } catch (PDOException $e){
        echo $e->getMessage();
    } 

    try{
        $stmt2 = $dbconn->prepare("INSERT INTO login(username,password,role) VALUES(?,?,?)");
/*
            $stmt2->bindValue(':user', $username);
            $stmt2->bindValue(':pass', $password);
            $stmt2->bindValue(':ro', $role);*/


        if($stmt2->execute(array($username,$password,$role))){
            echo json_encode(
                        array(
                            "message" => "Almost done registering",
                            "username" => $username,
                            "role" => $role
                        )
                );
        } else {
                //$auth_error = 'Wrong username or password.';
            echo json_encode(array("message" => "Register failed."));
        }
/*
        if($stmt2->execute(array($username,$password,$role))){
            json_encode(array("username"=> $username, "role" => $role));
        }*/


    } catch (PDOException $e){
        echo $e->getMessage();
    } 

?>