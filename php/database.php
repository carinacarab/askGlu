<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

function connect()
{
    $connection = pg_connect("host=localhost port=5433 dbname=askGluDB user=postgres password=t0B1a215");

    return $connection or die('Could not connect:'. pg_last_error());

    
}

?>