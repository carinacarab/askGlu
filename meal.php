<?php
	include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $username = $request->user;
    $itemNo = $request->itemNo;

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
            print_r("error1");
        }

        //print_r($personid);

    } catch (PDOException $e){
        echo $e->getMessage();
    } 
    //print_r($personid);

    if(!empty($personid)){
	    try{
	    	$stmt2 = $dbconn->prepare("SELECT * FROM foodcarbs WHERE itemno = :fNo");

	        $stmt2->bindValue(':fNo', $itemNo);

	        $matchingfoods = array();

	        if ($stmt2->execute()) {
	            $matchingfoods = $stmt2->fetchAll();
	            //print_r($matchingfoods);
	           
	        } else {
	        	print_r("error2");
	        }
	        if(!empty($matchingfoods)){

	            foreach($matchingfoods as $row) {
	                $itemnumber = $row['itemno'];
	                $itemname = $row['itemdescription'];
	                $itemunit = $row['unit'];
	                $itemcarbs = $row['carbcount'];

	               /* print_r($itemname);
	                print_r($itemunit);
	                print_r($itemcarbs);*/

	            }
	            $stmt3 = $dbconn->prepare("INSERT INTO meals (foodid, units, carbcount, userid, foodname) VALUES (:fooid, :uni, :carb, :user, :foodn)");



	            $stmt3->bindParam(':fooid', $itemnumber);
	            $stmt3->bindParam(':uni', $itemunit);
	            $stmt3->bindParam(':carb', $itemcarbs);
	            $stmt3->bindParam(':user',$personid);
	            $stmt3->bindParam(':foodn',$itemname);

	            if($stmt3->execute()){
	            	//print_r("success");
	            }

	        } else {
	            print_r("error3");
	        }


	    }catch (PDOException $e){
	        echo $e->getMessage();
	    }
	}

	try{
		$stmt4 = $dbconn->prepare("SELECT * FROM meals WHERE userid = :user");

		$stmt4->bindParam(':user', $personid);

		if($stmt4->execute()){
			$mealplan = $stmt4->fetchAll();
		}

	}catch (PDOException $e){
	        echo $e->getMessage();
	    }
	if(!empty($mealplan)){
		echo json_encode($mealplan);
	}
?>