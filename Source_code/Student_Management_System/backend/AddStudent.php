<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['name'];
    $birthdate = $_POST['dob'];
    $gender = $_POST['gender'];
    $address = $_POST['address'];
    $email = $_POST['email'];

    $sql = "SELECT MAX(ID_HOCSINH) AS max_id FROM HOCSINH";
    $result = $conn->query($sql);
    if ($result) {
        $row = $result->fetch_assoc();
        $next_id = $row['max_id'] + 1;
    } else {
        $next_id = 1;
    }
    $maLopBanDau = '0';
    $stmt = $conn->prepare("INSERT INTO HOCSINH (ID_HOCSINH, HOTEN, NGAY_SINH, GIOI_TINH, DIACHI, EMAIL, ID_LOP) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssss",$next_id, $fullname, $birthdate, $gender, $address, $email, $maLopBanDau);

    if ($stmt->execute()) {
        echo "New student registered successfully. Student Code: $next_id";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>