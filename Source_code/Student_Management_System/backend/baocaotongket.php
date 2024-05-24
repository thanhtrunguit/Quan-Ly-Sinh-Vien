<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$semester = $_POST['HOCKY'];
$year = $_POST['NAM'];

$sql_get_hocky = "SELECT ID_HOCKY FROM HOC_KY WHERE NAM_HOC = '$year' AND HOC_KY = '$semester'";
$result_hocky = mysqli_query($conn, $sql_get_hocky);
$row_hocky = mysqli_fetch_assoc($result_hocky);
$id_hocky = $row_hocky['ID_HOCKY'];

$diem_dat_hocky = "SELECT GIATRI_THAMSO FROM THAM_SO WHERE ID_THAMSO = '1'";
$diemdat = mysqli_query($conn, $diem_dat_hocky);

$row_hocky = mysqli_fetch_assoc($diemdat);
$diemdat = $row_hocky['GIATRI_THAMSO'];

$sql_report = "SELECT
LOP.ID_LOP, 
LOP.SISO,
SUM(CASE WHEN diem_tb_tb >= '$diemdat' THEN 1 ELSE 0 END) AS soluongdat,
ROUND(SUM(CASE WHEN diem_tb_tb >= '$diemdat' THEN 1 ELSE 0 END) / COUNT(HOCSINH.ID_HOCSINH) * 100, 2) AS tiledat
FROM 
LOP 
INNER JOIN HOCSINH ON LOP.ID_LOP = HOCSINH.ID_LOP
INNER JOIN (
    SELECT 
        ID_HOCSINH, 
        AVG(DIEM_TB) AS diem_tb_tb
    FROM 
        CHI_TIET_DIEM
    WHERE 
        ID_HOCKY = '$id_hocky'
        GROUP BY 
        ID_HOCSINH
) AS avg_diem ON HOCSINH.ID_HOCSINH = avg_diem.ID_HOCSINH
GROUP BY 
LOP.ID_LOP, 
LOP.SISO
LIMIT 0, 25;";
$result_report = mysqli_query($conn, $sql_report);
$report_data = array();
if (mysqli_num_rows($result_report) > 0) {
    while ($row_report = mysqli_fetch_assoc($result_report)) {
        $report_data[] = $row_report;
    }
}
mysqli_close($conn);
echo json_encode($report_data);
?>