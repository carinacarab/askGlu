<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");

    //if(isset($postdata) && !empty($postdata)) {

    $request = json_decode($postdata);

    //print_r($request);

    //sanitizing
    $username = $request->username;
    $permdose = $request->permdose;
    $time = $request->time;
    $corratio= $request->correction;
    $mealratio = $request->mealratio;
    $freq = $request->pillfreq;

    try{
        $stmt = $dbconn->prepare("SELECT userid FROM appusers WHERE username = :us");

        $stmt->bindValue(':us', $username);

        $resultid = array();

        if ($stmt->execute()) {
            $resultid = $stmt->fetchAll();
        }
        if(!empty($resultid)){
            foreach($resultid as $row) {
                $resultuid = $row['userid'];
            }
        }
        //print_r($resultuid);


    } catch (PDOException $e){
        echo $e->getMessage();
    } 

    if(!empty($resultuid)){
        try{
            $stmt2 = $dbconn->prepare("INSERT INTO medneeds(userid, permanentdose, timeofday, correctionratio, mealratio, pillfrequency) VALUES(:uid, :pd, :tod, :cr, :mr, :pf)");
            
            $stmt2->bindValue(':uid', $resultuid);
            $stmt2->bindValue(':pd', $permdose);
            $stmt2->bindValue(':tod', $time);
            $stmt2->bindValue(':cr', $corratio);
            $stmt2->bindValue(':mr', $mealratio);
            $stmt2->bindValue(':pf', $freq);

            $stmt2->execute();/*


            if($stmt2->execute()){
                echo "success";
            } else {
                echo "failed";
            }*/


        } catch (PDOException $e){
            echo $e->getMessage();
        } 
    }

    

?>