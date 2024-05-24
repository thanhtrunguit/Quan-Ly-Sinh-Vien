<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "ten_database";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}
// cái này lấy danh sách lớp từ dtb
$sql_lop = "SELECT * FROM LOP";
$result_lop = $conn->query($sql_lop);

if ($result_lop->num_rows > 0) {
    //cái này hiển thị danh sách
    echo "<form method='post'>";
    echo "<select name='lop'>";
    while($row_lop = $result_lop->fetch_assoc()) {
        echo "<option value='" . $row_lop['id_lop'] . "'>" . $row_lop['ten_lop'] . "</option>";
    }
    echo "</select>";
    echo "<input type='submit' value='Chọn'>";
    echo "</form>";
} else {
    echo "Không có lớp nào trong cơ sở dữ liệu.";
}
// này thì nhờ trung xử
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $selected_lop = $_POST['lop'];
    // cái này chọn những đứa chưa có lớp
    $sql_hocsinh = "SELECT * FROM HOCSINH WHERE id_lop IS NULL";
    $result_hocsinh = $conn->query($sql_hocsinh);
    if ($result_hocsinh->num_rows > 0) {
        // này thì show ra thằng chưa có lớp
        echo "<form method='post'>";
        echo "<input type='hidden' name='selected_lop' value='$selected_lop'>";
        while($row_hocsinh = $result_hocsinh->fetch_assoc()) {
            echo "<input type='checkbox' name='hocsinh[]' value='" . $row_hocsinh['id_hocsinh'] . "'>" . $row_hocsinh['ten_hocsinh'] . "<br>";
        }
        echo "<input type='submit' value='Thêm'>";
        echo "</form>";
    } else {
        echo "Không có học sinh nào chưa có lớp.";
    }
}
// cái này thì người ta chọn xong bấm thêm
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['hocsinh'])) {
    $selected_lop = $_POST['selected_lop'];
    $selected_hocsinh = $_POST['hocsinh'];
    // Gán id_lop
    foreach ($selected_hocsinh as $hocsinh) {
        $sql_update = "UPDATE HOCSINH SET id_lop='$selected_lop' WHERE id_hocsinh='$hocsinh'";
        $conn->query($sql_update);
    }
    echo "Đã thêm học sinh vào lớp thành công.";
}
$conn->close();
?>