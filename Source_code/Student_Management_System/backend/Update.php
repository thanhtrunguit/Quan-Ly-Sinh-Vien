<?php
header("Access-Control-Allow-Origin: *");

$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

//$students = $_POST['students'];
//foreach ($students as $student) {
    $id = $_POST['id'];
    $MALOP = $_POST['MALOP'];

    $sql = "UPDATE HOCSINH SET ID_LOP = '$MALOP' WHERE ID_HOCSINH = '$id'";
    mysqli_query($conn, $sql);
//}
mysqli_close($conn);
?>