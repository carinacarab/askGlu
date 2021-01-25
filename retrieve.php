<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$username = $request->user;

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
   // if(!empty($personid)){
        try{

            $stmt2 = $dbconn->prepare("SELECT date, bloodsugar FROM bstracker WHERE userid = :puid ORDER BY date ASC");

            $stmt2->bindValue(':puid', $personid);

            //$stmt2->execute();

            //$result = $stmt2->fetchAll();

            if ($stmt2->execute()) {
                $result = $stmt2->fetchAll();

            foreach ($result as $key => $row){
                //echo json_encode(($row['time']));
                $row['date'] = date('m/d/Y H:i:s', strtotime($row['date']));

                $result[$key] = $row;

            }


            

            //print_r($result);
        } else {
            echo "failed to execute";
        }



        } catch (PDOException $e){
            echo $e->getMessage();
        } 
    //}   
    foreach ($result as $row){
        $dates=$row['date'];
        $sugar=$row['bloodsugar'];

        $data = array (
                "date" => $dates,
                "sugar" => $sugar
                );
        array_push($dataarray, $data);
    }
    if(!empty($dataarray)){
        echo json_encode($dataarray);
    }

?>