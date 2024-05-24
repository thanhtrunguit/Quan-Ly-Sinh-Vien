<?php
header("Access-Control-Allow-Origin: *");
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";
$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

if( $_POST['ageMax'] && $_POST['ageMin'])
{
    $ageMax = $_POST['ageMax'];
    $ageMin = $_POST['ageMin'];

    $sql = "UPDATE THAMSO SET AGE_MAX = '$ageMax', AGE_MIN = '$ageMin' ";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
    echo json_encode($sql);
}

if($_POST['siso'] && $_POST['className']){
    $siso = $_POST['siso'];
    $classname = $_POST['className'];
    $id_lop = $_POST['ID_LOP'];

    $sql = "UPDATE LOP SET ID_LOP = '$classname', SISO = '$siso' where ID_LOP = '$id_lop' ";
    mysqli_query($conn, $sql);
    $sql = "UPDATE HOCSINH SET ID_LOP = '$classname' where ID_LOP = '$id_lop' ";
    mysqli_query($conn, $sql);

    mysqli_close($conn);
    echo json_encode($sql);
}

if($_POST['subjectName'] && $_POST['className']){
    $siso = $_POST['siso'];
    $classname = $_POST['className'];
    $id_lop = $_POST['ID_LOP'];

    $sql = "UPDATE LOP SET ID_LOP = '$classname', SISO = '$siso' ";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
    echo json_encode($sql);
}

if($_POST['score']){
    $score = $_POST['score'];

    $sql = "UPDATE THAM_SO SET GIATRI_THAMSO = '$score' where ID_THAMSO = '1'";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
    echo json_encode($sql);
}


?>