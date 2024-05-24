<?php
header("Access-Control-Allow-Origin: *");

$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$MALOP = $_POST['class'];

$SISO = "SELECT SISO FROM LOP WHERE ID_LOP = '$MALOP' ";
$ss = mysqli_query($conn, $SISO);
$rowhk = mysqli_fetch_assoc($ss);
$siso_lop = $rowhk['SISO'];
mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($siso_lop);
?>