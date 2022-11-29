<?php

include("connect.php");
$tablename = "userbase";
$responseStatus = '200 OK';
$msg = 'nothing';

if(!isset($_POST['user_name'])) {
    $msg = 'Anfrage enthält keinen Nutzernamen';
    echo $msg;
} else {
    $validatePattern = '/^[a-zA-Z0-9\s]{4,20}$/';
    if(!preg_match($validatePattern,$_POST['user_name'])) {
       $msg = 'Nutzername entspricht nicht den Vorgaben. Der Benutzername muss aus kleinen Buchstaben(a-z) und/oder Ziffern(0-9) bestehen und 4-20 Zeichen lang sein';
       echo $msg;
    } else loginAttempt($_POST, $con, $tablename);
}

function loginAttempt($data, $db, $table) {

    $result = false;

    $new_user = $data['user_name'];
    $user_group = $data['group_selector'];
    $user_team = "";

    $sql = "INSERT INTO ".$table." (user_name, user_group, user_team) VALUES ('$new_user', '$user_group', '$user_team')"; 
    if($db->query($sql) === TRUE){
       $msg="Anmeldung erfolgreich";
    }
    else{
       $msg="Anmeldung fehlgeschlagen";
    }

    $msg = "Login Attempted";
    echo $msg;
}

?>