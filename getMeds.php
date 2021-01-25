<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    //print_r($request);

	$username = $request;

    $dataarray = [];

    //print_r($request);

    //first let's get the userid of the logged in user
    try{
        $stmt = $dbconn->prepare("SELECT userid FROM appusers WHERE username = :us");

        $stmt->bindValue(':us', $username);

        //print_r($username);

        //print_r($reading);

        $person = array();

        if ($stmt->execute()) {
            $person = $stmt->fetchAll();
            //print_r($person);
        }
        if(!empty($person)){
            foreach($person as $row) {
                $personid = $row['userid'];
            }
        } else {
            print_r("error");
        }

        //print_r($personid);

    } catch (PDOException $e){
        echo $e->getMessage();
    } 
    if(!empty($personid)){
        try{

            $stmt2 = $dbconn->prepare("SELECT * FROM medneeds WHERE userid = :puid");

            $stmt2->bindValue(':puid', $personid);

            //$stmt2->execute();

            //$result = $stmt2->fetchAll();

            if ($stmt2->execute()) {
                $result = $stmt2->fetchAll();
            } else {
                echo "failed to execute";
            }



        } catch (PDOException $e){
            echo $e->getMessage();
        } 
    }   
    foreach ($result as $row){
        $permdose=$row['permanentdose'];
        $corrratio=$row['correctionratio'];
        $mealratio=$row['mealratio'];
        $timeInsulin = $row['timeofday'];
        $freq = $row['pillfrequency'];

        $data = array (
                "permanentdose" => $permdose,
                "correctionratio" => $corrratio,
                "mealratio"=> $mealratio,
                "timeofday"=> $timeInsulin,
                "pillfrequency" => $freq
                );
        array_push($dataarray, $data);
    }
    if(!empty($dataarray)){
        echo json_encode($dataarray);
    }

?>