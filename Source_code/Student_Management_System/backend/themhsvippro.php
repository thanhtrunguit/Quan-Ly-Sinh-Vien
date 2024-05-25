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

//    $birthYear = (int)date('Y', strtotime($birthdate));
//    $currentYear = (int)date('Y');
//    $age = $currentYear - $birthYear;
//    if ($age == 15) {
//        $grade = '10';
//        $prefix = '23';
//    } elseif ($age == 16) {
//        $grade = '11';
//        $prefix = '22';
//    } elseif ($age == 17) {
//        $grade = '12';
//        $prefix = '21';
//    } else {
//        die("Invalid age for school.");
//    }
//    // Truy vấn để tìm mã học sinh lớn nhất hiện có với tiền tố tương ứng (gpt)
//    $sql = "SELECT MAX(CAST(SUBSTRING(ID_HOCSINH, 3, 4) AS UNSIGNED)) AS max_code FROM HOCSINH WHERE ID_HOCSINH LIKE '$prefix%'";
//    $result = $conn->query($sql);
//    if ($result) {
//        $row = $result->fetch_assoc();
//        $next_code = $row['max_code'] + 1;
//        $student_code = $prefix . str_pad($next_code, 4, '0', STR_PAD_LEFT);
//    } else {
//        die("Error: " . $conn->error);
//    }

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