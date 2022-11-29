<?php

include("connect.php");
$groupTableName = "group_table";
$userTableName = "userbase";
$responseStatus = '200 OK';
$responseText = 'nothing';

if(isset($_GET['action']) && $_GET['action'] == 'fetch_grouplist'){
    fetch_grouplist($con, $groupTableName);
}
elseif(isset($_GET['action']) && $_GET['action'] == 'fetch_userlist') {
    fetch_userlist($con, $userTableName);
}

function fetch_grouplist($db, $table) {
    if(empty($db)) {
        $msg = "Database connection error";
    }
    elseif(empty($table)) {
        $msg = "group_table name is empty";
    }

    else {
        $result = true;
        $sql = "SELECT * FROM ".$table;
        $result = $db->query($sql);
        if($result == true) { 
            if ($result->num_rows > 0) {
                $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $msg = json_encode($row);
            } 
            else {
                $msg = "No Data Found";
            }
        }
        else {
            $msg = mysqli_error($db);
        }
    }
    echo $msg;
}


function fetch_userlist($db, $table) {

    if(empty($db)) {
        $msg = "Database connection error";
    }
    elseif(empty($table)) {
        $msg = "user_table name is empty";
    }

    else {
        $result = true;
        $sql = "SELECT * FROM ".$table;
        $result = $db->query($sql);
        if($result == true) { 
            if ($result->num_rows > 0) {
                $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $msg = json_encode($row);
            } 
            else {
                $msg = "No Data Found";
            }
        }
        else {
            $msg = mysqli_error($db);
        }
    }
    echo $msg;
}
?>