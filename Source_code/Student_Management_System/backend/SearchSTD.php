<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "studentdb";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$ten_hocsinh = $_POST['name'];


$sql = "SELECT studentInfo.NAME, lop.TENLOP, studentInfo.id,
               (SELECT diemTB FROM chitietdiem CD1 WHERE CD1.id = studentInfo.id AND CD1.HOCKY = '1') AS TBHK1,
               (SELECT diemTB FROM chitietdiem CD2 WHERE CD2.id = studentInfo.id AND CD2.HOCKY = '2') AS TBHK2
        FROM studentInfo, lop
        WHERE studentInfo.MALOP = lop.MALOP
        AND studentInfo.NAME = '$ten_hocsinh'";


$result = mysqli_query($conn, $sql);

$students = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $students[] = $row;
    }

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($students);
?>