<?php 
	$host = "127.0.0.1";
	$port = "5433";
	$db = "askGluDB";
	$user = "admin"; 
	$pass = "c00ki32";


	$dsn = "pgsql:host=askgludb.ct6yok2383wu.us-east-2.rds.amazonaws.com; port=5432; dbname= askgludb; user=postgres; password=58QLj409581sBXE1R88G";

	try{

		$dbconn = new PDO($dsn);
/*
		if($dbconn){
			echo "Connected to the <strong>$db</strong> database successfully!";
		} else {
			echo "nope";
		}

*/
	} catch (PDOException $e) {
		echo $e->getMessage();
	}

	/*$stmt = $dbconn->prepare("SELECT * FROM login");

	
	if ($stmt->execute()) {
  		while ($row = $stmt->fetch()) {
    		print_r($row);
 		}
	}
*/
	/*
	$username = "cari217";
    $password = "toby1020";

        
        try{

            $stmt = $dbconn->prepare("SELECT username FROM login WHERE username = :user AND password = :pass");

            $stmt->bindParam(':user', $username);
            $stmt->bindValue(':pass', $password);

            print_r($stmt);


            if ($stmt->execute()) {
  				while ($row = $stmt->fetch()) {
    				print_r($row);
		 		}
			}

        }catch (PDOException $e){
            echo $e->getMessage();
        }*/

?>