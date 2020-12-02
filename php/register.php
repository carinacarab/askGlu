<?php
    include_once("database.php");
    $request = json_decode($postdata);

    if(isset($postdata) && !empty($postdata)) {

        $f_name = $request->fName;
        $l_name = $request->lName;
        $email= $request->email;
        $username = $request->username;
        $password = $request->password;
        $role = $request->role;

        $sql = 'INSERT INTO users (fName, lName, username, email) VALUES(:f_name, :l_name, :username, :email)';
        $stmt = $this->pdo->prepare($sql);
    
        $stmt->bindValue(':f_name', $f_name);
        $stmt->bindValue(':l_name', $l_name);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
    
        $stmt->pg_execute();
/*
        $sql = 'SELECT userid FROM users where username IS :username';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':username', $username);

        $userid = $stmt->pg_execute();
*/

        $sql = 'INSERT INTO login (username, password, role) VALUES(:userid, :username, :role)';

        $stmt = $this->pdo->prepare($sql);

        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':password', $password);
        $stmt->bindValue(':role', $role);

        $stmt->pg_execute();
    
    }
?>

