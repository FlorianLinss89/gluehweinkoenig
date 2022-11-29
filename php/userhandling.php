<?php

include("connect.php");
$responseStatus = '200 OK';
$responseText = 'nothing';

if (isset($_GET['action']) && $_GET['action'] == 'fetch_grouplist') {
    fetch_grouplist($con);
} else if (isset($_GET['action']) && $_GET['action'] == 'fetch_userlist') {
    fetch_userlist($con);
}

function fetch_grouplist($db)
{
    if (empty($db)) {
        $msg = "Database connection error";
    } else {
        $sql = "SELECT * FROM group_table";
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


function fetch_userlist($db)
{

    if (empty($db)) {
        $msg = "Database connection error";
    } else {
        $result = true;
        $sql = "SELECT * FROM userbase";
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