<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
$username = $_POST['username'];

$MALOP_get = "SELECT LOP.ID_LOP
            FROM LOP, TAI_KHOAN
         WHERE ID_TAIKHOAN = '$username' and TAI_KHOAN.ID_GIAOVIEN = LOP.ID_GIAOVIEN ";
$malop = mysqli_query($conn, $MALOP_get);
if(mysqli_num_rows($malop) > 0){
    $rowhk = mysqli_fetch_assoc($malop);
    $malopgv = $rowhk['ID_LOP'];
    echo json_encode($malopgv);
}

mysqli_close($conn);

?>