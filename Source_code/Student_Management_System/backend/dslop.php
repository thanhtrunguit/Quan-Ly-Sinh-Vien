<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$sql = "SELECT ID_LOP FROM LOP where ID_LOP <> 0";
$result = $conn->query($sql);

$ten_lop_list = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ten_lop_list[] = $row['ID_LOP'];
    }
} else {
    echo "0";
}
$json_ten_lop = json_encode($ten_lop_list);
echo $json_ten_lop;
$conn->close();
?>