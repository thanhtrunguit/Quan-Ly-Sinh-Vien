<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$year= $_POST['NAM'];
$subject = $_POST['SUBJECT'];
$semester = $_POST['HOCKY'];

$sql_get_hocky = "SELECT ID_HOCKY FROM HOC_KY WHERE NAM_HOC = '$year' AND HOC_KY = '$semester'";
$result_hocky = mysqli_query($conn, $sql_get_hocky);

$row_hocky = mysqli_fetch_assoc($result_hocky);
$id_hocky = $row_hocky['ID_HOCKY'];

$diem_dat_hocky = "SELECT GIATRI_THAMSO FROM THAM_SO WHERE ID_THAMSO = '3'";
$diemdat = mysqli_query($conn, $diem_dat_hocky);

$row_hocky = mysqli_fetch_assoc($diemdat);
$diemdat = $row_hocky['GIATRI_THAMSO'];

$sql_report = "SELECT LOP.ID_LOP, count(HOCSINH.ID_HOCSINH) as SISO,
SUM(CASE WHEN chi_tiet_diem.DIEM_TB >= '$diemdat' THEN 1 ELSE 0 END) AS 'SO_LUONG_DAT',
ROUND(SUM(CASE WHEN chi_tiet_diem.DIEM_TB >= '$diemdat' THEN 1 ELSE 0 END) / count(HOCSINH.ID_HOCSINH) * 100, 2) AS 'TI_LE_DAT'
FROM lop, HOCSINH, chi_tiet_diem
WHERE chi_tiet_diem.ID_MONHOC = '$subject' AND chi_tiet_diem.ID_HOCKY = '$id_hocky' and HOCSINH.ID_LOP <> 0 and lop.ID_LOP = HOCSINH.ID_LOP and HOCSINH.ID_HOCSINH = chi_tiet_diem.ID_HOCSINH
GROUP BY lop.ID_LOP";

$result_report = mysqli_query($conn, $sql_report);
$report_data = array();

while ($row_report = mysqli_fetch_assoc($result_report)) {
    $report_data[] = $row_report;
}

mysqli_close($conn);
header('Content-Type: application/json');
echo json_encode($report_data);
?>