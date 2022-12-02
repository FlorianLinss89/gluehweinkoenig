<?php

include("connect.php");
$groupTableName = "group_table";
$userTableName = "userbase";
$responseStatus = '200 OK';
$responseText = 'nothing';

if (isset($_GET['action']) && $_GET['action'] == 'fetch_grouplist') {
    fetch_list($con, $groupTableName);
} else if (isset($_GET['action']) && $_GET['action'] == 'fetch_userlist') {
    fetch_list($con, $userTableName);
}

function fetch_list($db, $table)
{
    if (empty($db)) {
        $msg = "Database connection error";
    } else {
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
        } else {
            $msg = mysqli_error($db);
        }
    }
    echo $msg;
}

?>