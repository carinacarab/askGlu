<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");

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
            //print_r($resultid);
        }
        if(!empty($resultid)){
            foreach($resultid as $row) {
                $resultuid = $row['userid'];
            }
        }

    } catch (PDOException $e){
        echo $e->getMessage();
    } 
    //print_r($resultuid);

    if(!empty($resultuid)){
        try{
            $stmt2 = $dbconn->prepare("UPDATE medneeds SET permanentdose = :pd, timeofday= :tod, correctionratio = :cr, mealratio = :mr, pillfrequency= :pf WHERE userid = :uid");
            
            $stmt2->bindValue(':uid', $resultuid);
            $stmt2->bindValue(':pd', $permdose);
            $stmt2->bindValue(':tod', $time);
            $stmt2->bindValue(':cr', $corratio);
            $stmt2->bindValue(':mr', $mealratio);
            $stmt2->bindValue(':pf', $freq);

            $stmt2->execute();

        } catch (PDOException $e){
            echo $e->getMessage();
        } 
    }

    

?>