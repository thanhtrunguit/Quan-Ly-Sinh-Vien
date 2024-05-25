<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$ten_hocsinh = $_POST['name'];

$year = $_POST['NAM'];
$MAHOCKY1 = "SELECT ID_HOCKY FROM HOC_KY WHERE HOC_KY = '1' AND NAM_HOC = '$year'";
$resulthk1 = mysqli_query($conn, $MAHOCKY1);
$rowhk = mysqli_fetch_assoc($resulthk1);
$mahk1 = $rowhk['ID_HOCKY'];

$MAHOCKY2 = "SELECT ID_HOCKY FROM HOC_KY WHERE HOC_KY = '2' AND NAM_HOC = '$year'";
$resulthk2 = mysqli_query($conn, $MAHOCKY2);
$rowhk = mysqli_fetch_assoc($resulthk2);
$mahk2 = $rowhk['ID_HOCKY'];

$sql = "SELECT HOCSINH.HOTEN, HOCSINH.ID_HOCSINH, LOP.ID_LOP,
        (SELECT avg(DIEM_TB) FROM CHI_TIET_DIEM CD1 WHERE CD1.ID_HOCSINH = HOCSINH.ID_HOCSINH AND CD1.ID_HOCKY = '$mahk1') AS TBHK1,
        (SELECT avg(DIEM_TB) FROM CHI_TIET_DIEM CD2 WHERE CD2.ID_HOCSINH = HOCSINH.ID_HOCSINH AND CD2.ID_HOCKY = '$mahk2') AS TBHK2
        FROM HOCSINH, LOP
        WHERE HOCSINH.ID_LOP = LOP.ID_LOP
        AND HOCSINH.HOTEN LIKE CONCAT('%', ?, '%')";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $ten_hocsinh);
$stmt->execute();
$result = $stmt->get_result();

$students = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $students[] = $row;
    }

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($students);
?>