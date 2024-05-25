<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
$malop = $_POST["malop"];
$report_data = array();
$name = "SELECT HOTEN_GV
            FROM GIAO_VIEN, lop
         WHERE GIAO_VIEN.ID_GIAOVIEN = lop.ID_GIAOVIEN AND LOP.ID_LOP = '$malop'";
$NameGet = mysqli_query($conn, $name);
$namesend = mysqli_fetch_assoc($NameGet);
$NameGV = $namesend['HOTEN_GV'];


echo json_encode($NameGV);
mysqli_close($conn);

?>