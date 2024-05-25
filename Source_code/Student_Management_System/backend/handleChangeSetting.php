<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);


$response = array();
$ageMax = $_POST['ageMax'];
$ageMin = $_POST['ageMin'];

if ($ageMin !== null) {
    $sql_min_age = "INSERT INTO THAM_SO (ID_THAMSO, TEN_THAMSO, KIEU_THAMSO, GIATRI_THAMSO) VALUES ('1', 'Tuổi tối thiểu', 'int', '$ageMin')
                    ON DUPLICATE KEY UPDATE GIATRI_THAMSO='$ageMin'";
    $result = mysqli_query($conn, $sql_min_age);
}

if ($ageMax !== null) {
    $sql_max_age = "INSERT INTO THAM_SO (ID_THAMSO, TEN_THAMSO, KIEU_THAMSO, GIATRI_THAMSO) VALUES ('2', 'Tuổi tối đa', 'int', '$ageMax')
                    ON DUPLICATE KEY UPDATE GIATRI_THAMSO='$ageMax'";
    $result = mysqli_query($conn, $sql_max_age);
}


if($_POST['score']){
    $score = $_POST['score'];
    $mamon = $_POST['MAMON'];

    $mamon_check = "SELECT * from THAM_SO where ID_THAMSO = 'diemdat' and TEN_THAMSO = '$mamon' ";
    $result = mysqli_query($conn, $mamon_check);
    $row = mysqli_fetch_array($result);
    if($row > 0){
        $sql = "UPDATE THAM_SO SET GIATRI_THAMSO = '$score' where ID_THAMSO = 'diemdat' and TEN_THAMSO = '$mamon' ";
        $result = mysqli_query($conn, $sql);
    }
    else{
        $sql = "INSERT INTO THAM_SO (`ID_THAMSO`, `TEN_THAMSO`, `KIEU_THAMSO`, `GIATRI_THAMSO`)
             VALUES ('diemdat', '$mamon', 'float', '$score')";
        $result = mysqli_query($conn, $sql);
    }
}
mysqli_close($conn);
?>