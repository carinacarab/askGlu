<?php
	include_once("database.php");

	//print_r("connected to database");

    function elapsedTime($timestamp){
        //print_r($timestamp);
        //converting it to seconds for php to understand
        $post_time = strtotime($timestamp);

        //print_r($post_time);

        //set a variable to current time for comparison
        $current_time = time();

        $timemeasures=array("second","minute","hour","day","month","year");

        //if the current time is greater than time of post
        if($current_time>=$post_time){

             //time() is measured in seconds, so first divide by seconds
            $timelength=array(60, 60, 24, 30, 12, 10);
           
            //time age is equal to the difference btwn current time and posttime
            $age = time()-$post_time;

            //for all time measurements, let's divide as long as the number is large enouhg
            for($i=0; $age >= $timelength[$i] && $i<4; $i++){
                //reduce time to either seconds, minutes, hours, days, months, or years
                $age = $age/$timelength[$i];
            }

            $age = round($age);

            //print_r($age);

            return $age . " " . $timemeasures[$i] . "(s) ago";
        }
    }

    $result = array();

	try{

        $stmt = $dbconn->prepare("SELECT * FROM viewer");

        if ($stmt->execute()) {
            
            $result = $stmt->fetchAll();

            foreach ($result as $key => $row){
                //echo json_encode(($row['time']));
                $row['time'] = elapsedTime($row['time']);

                $result[$key] = $row;

            }
            

            //print_r($result);
        } else {
        	echo "failed to execute";
        }

        if(!empty($result)){
        		echo json_encode($result);
                /*foreach($result as $row) {
                	$resultados = array(
                			"username" =>$row['uname'],
                			"post" => $row['thought'],
                			"elapsedtime" => $row['age']
                			);
                	echo json_encode(
                		$resultados
                	);
                } */
                
        } else {
            echo json_encode(array("message" => "Unable to load thoughts."));
        }
    } catch (PDOException $e){
        echo $e->getMessage();
    }

    


?>