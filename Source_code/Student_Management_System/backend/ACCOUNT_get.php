<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$sql = "SELECT ID_TAIKHOAN, ID_GIAOVIEN, LOAI_TAIKHOAN FROM TAI_KHOAN";
$result = $conn->query($sql);

$list_tai_khoan = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $list_tai_khoan[] = $row;
    }
} else {
    echo "0 kết quả";
}
$json_ten_monhoc = json_encode($list_tai_khoan);
echo $json_ten_monhoc;
$conn->close();
?>
