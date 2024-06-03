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
    $role = $_POST['role'];

    $sql = "UPDATE TAI_KHOAN
                  SET LOAI_TAIKHOAN = '$role'
                  WHERE ID_TAIKHOAN = '$account'";
    mysqli_query($conn, $sql);
}

$conn->close();
?>