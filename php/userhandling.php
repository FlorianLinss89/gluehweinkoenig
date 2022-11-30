<?php

include("connect.php");
$responseStatus = '200 OK';
$responseText = 'nothing';

if (isset($_GET['action']) && $_GET['action'] == 'fetch_grouplist') {
    fetch_list($con, "group_table");
} else if (isset($_GET['action']) && $_GET['action'] == 'fetch_userlist') {
    fetch_list($con, "userbase");
}

function fetch_list($db, $table)
{
    if (empty($db)) {
        $msg = "Database connection error";
    } else {
        $sql = "SELECT * FROM ".$table;
        $result = $db->query($sql);
        if ($result) {
            if ($result->num_rows > 0) {
                $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $msg = json_encode($row);
            } else {
                $msg = "No Data Found";
            }
        } else {
            $msg = mysqli_error($db);
        }
    }
    echo $msg;
}

?>