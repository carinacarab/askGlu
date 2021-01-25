<?php
	include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $username = $request->user;

    $dataarray = [];


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
            print_r("error1");
        }

        //print_r($personid);

    } catch (PDOException $e){
        echo $e->getMessage();
    } 
    //print_r($personid);

    if(!empty($personid)){
	   
	    try{
		$stmt4 = $dbconn->prepare("SELECT * FROM meals WHERE userid = :user");

		$stmt4->bindParam(':user', $personid);

		if($stmt4->execute()){
			$mealplan = $stmt4->fetchAll();
		}

		}catch (PDOException $e){
		        echo $e->getMessage();
		}
	}


	foreach ($mealplan as $row){
        $id=$row['foodid'];
        $unit=$row['units'];
        $foodn=$row['foodname'];
        $carbs=$row['carbcount'];

        $data = array (
                "id" => $id,
                "unit" => $unit,
                "foodn" => $foodn,
                "carbs" => $carbs
                );
        array_push($dataarray, $data);
    }

	
	if(!empty($dataarray)){
		echo json_encode($dataarray);
	}
?>