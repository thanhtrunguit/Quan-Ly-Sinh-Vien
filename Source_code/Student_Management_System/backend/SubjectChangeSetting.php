<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

if ($_POST['subjectName'] != '') {
    $tenMonHoc_update = $_POST['subjectName'];
    $id_monhoc = $_POST['id_monhoc'];

    $sql = "UPDATE MON_HOC SET TEN_MONHOC = '$tenMonHoc_update' WHERE ID_MONHOC = '$id_monhoc'";
    mysqli_query($conn, $sql);

}

if ($_POST['actions_add'] != '') {
    $tenMonHoc_add = $_POST['TEN_MONHOC_add'];

    $sqlMaxId = "SELECT MAX(ID_MONHOC) AS max_id FROM MON_HOC";
    $result = $conn->query($sqlMaxId);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $maxId = $row['max_id'];
        $newId = (int)$maxId + 1;
    } else {
        $newId = 1;
    }
    $sql = "INSERT INTO `MON_HOC`(`ID_MONHOC`, `TEN_MONHOC`)
            VALUES ('$newId','$tenMonHoc_add')";
    mysqli_query($conn, $sql);

}
if ($_POST['actions_dell'] != "") {
    $id_delete = $_POST['id_monhoc_dell'];
    $sqlDelete = "DELETE FROM `MON_HOC` WHERE ID_MONHOC = '$id_delete'";
    mysqli_query($conn, $sqlDelete);

}
$conn->close();

?>