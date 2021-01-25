<?php

	include_once("database.php");


    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$username = $request->user;


	function a1ccalculator($avgsugar){
		$a1c = ($avgsugar+46.7)/28.7;
		return $a1c;
	}


    //print_r($request);

    //first let's get the userid of the logged in user
    try{
        $stmt = $dbconn->prepare("SELECT userid FROM appusers WHERE username = :us");

        $stmt->bindValue(':us', $username);

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

        $stmt = $dbconn->prepare("SELECT * FROM average WHERE userid = :uid");

        $stmt->bindValue(':uid', $personid);

        if ($stmt->execute()) {
            $result = $stmt->fetchAll();

            foreach ($result as $row){
                //echo json_encode(($row['time']));
                $avgreading = $row['avgsugar'];

                $printer = array("avgsugar"=>round($row['avgsugar'], 2) , "a1c"=>round(a1ccalculator($avgreading), 2));
                
            }
            //print_r($printer);

            //print_r($result);
        } else {
        	echo "failed to execute";
        }
    } catch (PDOException $e){
        echo $e->getMessage();
    } 

    if(!empty($printer)){
    	//print_r($printer);
    	echo json_encode($printer);
    }


?>