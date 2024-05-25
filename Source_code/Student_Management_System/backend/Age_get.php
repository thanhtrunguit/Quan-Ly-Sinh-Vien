<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
$report_data = array();
$AgeMax = "SELECT GIATRI_THAMSO
            FROM THAM_SO
         WHERE ID_THAMSO = 1";
$AgeMaxGet = mysqli_query($conn, $AgeMax);
$agemax = mysqli_fetch_assoc($AgeMaxGet);
$AgeMaxSend = $agemax['GIATRI_THAMSO'];

$AgeMin = "SELECT GIATRI_THAMSO
            FROM THAM_SO
         WHERE ID_THAMSO = 2";
$AgeMinGet = mysqli_query($conn, $AgeMin);
$agemin = mysqli_fetch_assoc($AgeMinGet);
$AgeMinSend = $agemin['GIATRI_THAMSO'];

$report_data = [
    "agemax" => $AgeMaxSend,
    "agemin" => $AgeMinSend
];
echo json_encode($report_data);
mysqli_close($conn);

?>