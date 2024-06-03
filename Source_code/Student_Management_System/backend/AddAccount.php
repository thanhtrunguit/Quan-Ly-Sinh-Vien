<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $account = $_POST['account'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    $sql = "INSERT INTO TAI_KHOAN (ID_TAIKHOAN, MAT_KHAU, ID_GIAOVIEN, LOAI_TAIKHOAN) VALUES ('$account', '$password', '0' ,'$role')";
    mysqli_query($conn, $sql);
}

$conn->close();
?>