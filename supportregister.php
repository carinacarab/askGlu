<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");

    //if(isset($postdata) && !empty($postdata)) {

    $request = json_decode($postdata);

    //print_r($request);

    //sanitizing
    $username = $request->username;
    $fName = $request->first;
    $lName = $request->last;
    $email= $request->email;
    
    try{
        $stmt = $dbconn->prepare("SELECT userid FROM appusers WHERE first = :fn AND last = :ln AND email = :em");
        
        $stmt->bindValue(':fn', $fName);
        $stmt->bindValue(':ln', $lName);
        $stmt->bindValue(':em', $email);

        $result = array();

        if ($stmt->execute()) {
            $result = $stmt->fetchAll();
        }
        if(!empty($result)){
            foreach($result as $row) {
                $resultuid = $row['userid'];
            }
        }

        //print_r($resultuid);

    } catch (PDOException $e){
        echo $e->getMessage();
    } 

    //print_r("Retrieving support person's userid");

    try{
        $stmt2 = $dbconn->prepare("SELECT userid FROM appusers WHERE username = :us");

        $stmt2->bindValue(':us', $username);

        $supportid = array();

        if ($stmt2->execute()) {
            $supportid = $stmt2->fetchAll();
        }
        if(!empty($supportid)){
            foreach($supportid as $row) {
                $supportuid = $row['userid'];
            }
        }

        //print_r($supportuid);

    } catch (PDOException $e){
        echo $e->getMessage();
    } 

    if(!empty($resultuid) && !empty($supportuid)){

        try{

            $stmt3 = $dbconn->prepare("UPDATE appusers SET support = :sid WHERE userid = :uid");

            $stmt3->bindValue(':sid', $supportuid);
            $stmt3->bindValue(':uid', $resultuid);

            $stmt3->execute();/*

            if($stmt3->execute()){
                echo "Update 1 Success\n";
            }
*/

        } catch(PDOException $e){
            echo $e->getMessage();
        }

        try{

            $stmt4 = $dbconn->prepare("UPDATE appusers SET diabetic = :did WHERE userid = :sid");

            $stmt4->bindValue(':did', $resultuid);
            $stmt4->bindValue(':sid', $supportuid);

            $stmt4->execute();/*

            if($stmt4->execute()){
                echo "Update 2 Success\n";
            }*/

        } catch(PDOException $e){
            echo $e->getMessage();
        }
            
    

    } else {
        echo "FAILED UPDATE";
    }

?>