<?php

    include_once("database.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $symbol = "%";
	$foodname = $request->name;

	$finalfood = $symbol.$foodname.$symbol;
	
	$dataarray = [];


  
    try{

        $stmt = $dbconn->prepare("SELECT * FROM foodcarbs WHERE  itemdescription LIKE :foodn ");

        $stmt->bindValue(':foodn', $finalfood);

        $matchingfoods = array();

        if ($stmt->execute()) {
            $matchingfoods = $stmt->fetchAll();
           
        } else {
        	print_r("error");
        }

        //print_r($personid);

    } catch (PDOException $e){
        echo $e->getMessage();
    } 
    foreach ($matchingfoods as $row){
        $name=$row['itemdescription'];
        $unit=$row['unit'];
        $carbs=$row['carbcount'];
        $itemNo=$row['itemno'];

        $data = array (
                "itemname" => $name,
                "unit" => $unit,
                "carbs" => $carbs,
                "itemNo" => $itemNo
                );
        array_push($dataarray, $data);
    }
    if(!empty($dataarray)){
        echo json_encode($dataarray);
    }
/*
    if(!empty($matchingfoods)){
    	echo json_encode($matchingfoods);
    }*/
/*
    if(!empty($matchingfoods)){
        	foreach($matchingfoods as $row) {
                    $matchid = $row['itemNo'];
                    $matchdesc = $row['itemdescription'];
                    $matchunit = $row['unit'];
                    $matchcarbs = $row['carbcount'];

       
            echo json_encode(
                array(
                    "itemid" => $matchid,
                    "itemdescription" => $matchdesc,
                    "unit" => $matchunit,
                    "carbcount" => $matchcarbs
                )
            );}
               
    }*/
?>