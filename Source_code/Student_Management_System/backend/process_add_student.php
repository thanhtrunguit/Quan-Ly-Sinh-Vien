<?php
// Bao gồm tệp kết nối cơ sở dữ liệu
require 'db.php';

// Kiểm tra các biến POST tồn tại
if (
    isset($_POST['ten']) && 
    isset($_POST['gioi_tinh']) && 
    isset($_POST['ngay_sinh']) && 
    isset($_POST['dia_chi']) && 
    isset($_POST['email'])
) {
    // Lấy dữ liệu từ biểu mẫu
    $ten = $_POST['ten'];
    $gioi_tinh = $_POST['gioi_tinh'];
    $ngay_sinh = $_POST['ngay_sinh'];
    $dia_chi = $_POST['dia_chi'];
    $email = $_POST['email'];

    // Kiểm tra tuổi hợp lệ
    $birthdateDate = new DateTime($ngay_sinh);
    $today = new DateTime();
    $age = $today->diff($birthdateDate)->y;

    if ($age < 15 || $age > 20) {
        echo "Tuổi học sinh phải từ 15 đến 20.";
        $conn->close();
        exit();
    }

    // Chuẩn bị câu SQL để chèn dữ liệu
    $sql = "INSERT INTO hocsinh (ten, gioi_tinh, ngay_sinh, dia_chi, email) VALUES (?, ?, ?, ?, ?)";

    // Chuẩn bị câu lệnh
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    // Ràng buộc các biến
    $stmt->bind_param("sssss", $ten, $gioi_tinh, $ngay_sinh, $dia_chi, $email);

    // Thực thi câu lệnh
    if ($stmt->execute()) {
        echo "Hồ sơ đã được thêm thành công.";
    } else {
        echo "Lỗi: " . $stmt->error;
    }

    // Đóng câu lệnh và kết nối
    $stmt->close();
} else {
    echo "Thiếu thông tin yêu cầu.";
}

$conn->close();
?>