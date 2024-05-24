<?php
header("Access-Control-Allow-Origin: *");

$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$id = $_POST['id'];
$score15 = $_POST['score15'];
$score45 = $_POST['score45'];
$scoretb = $_POST['scoretb'];
$mamon = $_POST['MAMON'];

$semester = $_POST['HOCKY'];
$year = $_POST['NAM'];

$sql_get_hocky = "SELECT ID_HOCKY FROM HOC_KY WHERE NAM_HOC = '$year' AND HOC_KY = '$semester'";
$result_hocky = mysqli_query($conn, $sql_get_hocky);

$row_hocky = mysqli_fetch_assoc($result_hocky);
$id_hocky = $row_hocky['ID_HOCKY'];

$MAMON_check = "SELECT * FROM CHI_TIET_DIEM WHERE ID_HOCSINH = '$id' AND ID_MONHOC = '$mamon' AND ID_HOCKY = '$id_hocky'";
$result = mysqli_query($conn, $MAMON_check);

if ($result->num_rows > 0) {
    $sql = "UPDATE CHI_TIET_DIEM
                  SET DIEM_15P = '$score15', DIEM_45P = '$score45', DIEM_TB = '$scoretb'
                  WHERE ID_HOCSINH = '$id' AND ID_MONHOC = '$mamon' AND ID_HOCKY = '$id_hocky'";
    mysqli_query($conn, $sql);

} else {
    $sql = "INSERT INTO CHI_TIET_DIEM (`ID_HOCSINH`, `ID_MONHOC`, `ID_HOCKY`, `DIEM_15P`, `DIEM_45P`, `DIEM_TB`)
             VALUES ('$id', '$mamon', '$id_hocky', '$score15', '$score45', '$scoretb')";
    mysqli_query($conn, $sql);
}

mysqli_close($conn);
?>