<?php
header("Access-Control-Allow-Origin: *");

$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "studentdb";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
$students = $_POST['students'];
//foreach ($students as $student) {
    $id = $_POST['id'];
    $MALOP = $_POST['MALOP'];

    $sql = "UPDATE studentInfo SET MALOP = '$MALOP' WHERE ID = '$id'";
    mysqli_query($conn, $sql);
//}
mysqli_close($conn);
?>