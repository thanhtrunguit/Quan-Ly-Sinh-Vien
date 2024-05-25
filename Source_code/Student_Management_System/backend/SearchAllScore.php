<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$ten_lop = $_POST['class'];
$year = $_POST['NAM'];
$mamon = $_POST['MAMON'];
$hocky = $_POST['HOCKY'];
$MAHOCKY1 = "SELECT ID_HOCKY FROM HOC_KY WHERE HOC_KY = '$hocky' AND NAM_HOC = '$year'";
$resulthk1 = mysqli_query($conn, $MAHOCKY1);
$rowhk = mysqli_fetch_assoc($resulthk1);
$mahk = $rowhk['ID_HOCKY'];

$sql = "SELECT HOCSINH.HOTEN, HOCSINH.ID_HOCSINH, LOP.ID_LOP,
        (SELECT DIEM_15P FROM CHI_TIET_DIEM CD2 WHERE CD2.ID_HOCSINH = HOCSINH.ID_HOCSINH AND CD2.ID_HOCKY = '$mahk' AND ID_MONHOC = '$mamon') AS DIEM15,
        (SELECT DIEM_45P FROM CHI_TIET_DIEM CD2 WHERE CD2.ID_HOCSINH = HOCSINH.ID_HOCSINH AND CD2.ID_HOCKY = '$mahk' AND ID_MONHOC = '$mamon') AS DIEM45,
        (SELECT DIEM_TB FROM CHI_TIET_DIEM CD2 WHERE CD2.ID_HOCSINH = HOCSINH.ID_HOCSINH AND CD2.ID_HOCKY = '$mahk' AND ID_MONHOC = '$mamon') AS DIEMTB
        FROM HOCSINH, LOP
        WHERE HOCSINH.ID_LOP = LOP.ID_LOP
        AND LOP.ID_LOP = '$ten_lop'";


$result = mysqli_query($conn, $sql);
$report_data = array();
$students = array();
while ($row = mysqli_fetch_assoc($result)) {
    $students[] = $row;
}

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($students);
?>