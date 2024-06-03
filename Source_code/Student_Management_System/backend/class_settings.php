<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$nhanlop = $_POST['nhanlop'] ?? null;
$nhansiso = $_POST['nhansiso'] ?? null;
$tenlopmoi = $_POST['tenlopmoi'] ?? null;
$lopthem = $_POST['lopthem'] ?? null;
$lopxoa = $_POST['lopxoa'] ?? null;

if ($nhansiso !== null) {
    $stmt = $conn->prepare("SELECT COUNT(*) FROM hocsinh WHERE ID_LOP = ?");
    $stmt->bind_param("s", $nhanlop);
    $stmt->execute();
    $stmt->bind_result($student_count);
    $stmt->fetch();
    $stmt->close();

    if ($nhansiso < $student_count) {
        echo "wrong";
    } else {
        $stmt = $conn->prepare("UPDATE lop SET SISO = ? WHERE ID_LOP = ?");
        $stmt->bind_param("is", $nhansiso, $nhanlop);
        $stmt->execute();
        $stmt->close();
    }
}

if ($tenlopmoi !== null) {
    $stmt = $conn->prepare("UPDATE lop SET ID_LOP = ? WHERE ID_LOP = ?");
    $stmt->bind_param("ss", $tenlopmoi, $nhanlop);
    $stmt->execute();
    $stmt->close();
}

if ($lopthem !== null) {
    $sql = "SELECT MAX(CAST(SUBSTRING(ID_GIAOVIEN, 3) AS UNSIGNED)) AS max_id FROM lop WHERE ID_GIAOVIEN LIKE 'GV%'";
    $result = $conn->query($sql);

    if ($result && $row = $result->fetch_assoc()) {
        $max_id = $row['max_id'];
        $new_id = 'GV' . ($max_id + 1);

        $sql = "INSERT INTO lop (ID_LOP, SISO, ID_GIAOVIEN) VALUES ('$lopthem', 0, 'admin')";
        $res = mysqli_query($conn, $sql);
    }
}

if ($lopxoa !== null) {
    $stmt = $conn->prepare("SELECT COUNT(*) FROM hocsinh WHERE ID_LOP = ?");
    $stmt->bind_param("s", $lopxoa);
    $stmt->execute();
    $stmt->bind_result($student_count);
    $stmt->fetch();
    $stmt->close();

    if ($student_count > 0) {
    }
        $stmt = $conn->prepare("DELETE FROM lop WHERE ID_LOP = ?");
        $stmt->bind_param("s", $lopxoa);
        $stmt->execute();
        $stmt->close();
    }


$conn->close();
?>
