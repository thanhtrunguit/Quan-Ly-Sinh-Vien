<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$sql = "SELECT TEN_MONHOC, ID_MONHOC FROM MON_HOC";
$result = $conn->query($sql);

$ten_monhoc_list = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ten_monhoc_list[] = $row;
    }
} else {
    echo "0 kết quả";
}
$json_ten_monhoc = json_encode($ten_monhoc_list);
echo $json_ten_monhoc;
$conn->close();
?>
