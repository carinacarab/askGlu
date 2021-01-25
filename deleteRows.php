<?php
	include_once("database.php");

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$username = $request->user;
    $rowno = $request->itemno;

    print_r($request);

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

    try{
    	$stmt2 = $dbconn->prepare("DELETE FROM meals WHERE userid = :uid AND foodid = :fid");

    	$stmt2->bindParam(':uid', $personid);
        $stmt2->bindParam(':fid', $rowno);


    	$stmt2->execute();

    }catch (PDOException $e){
        echo $e->getMessage();
    } 

?>