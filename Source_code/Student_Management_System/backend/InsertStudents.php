<?php
header("Access-Control-Allow-Origin: *");

$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

    $name = $_POST['name'];
    $gender = $_POST["gender"];
    $dob = $_POST["dob"];
    $email = $_POST["email"];
    $address = $_POST["address"];



    $sql = "INSERT INTO `HOCSINH`(`ID_HOCSINH`, `HOTEN`, `NGAY_SINH`, `GIOI_TINH`, `DIACHI`, `EMAIL`, `ID_LOP`)
        VALUES ('','$name','$dob','$gender','$address','$email','0')";
    mysqli_query($conn, $sql);
?>