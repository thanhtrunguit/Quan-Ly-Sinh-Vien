<?php
    header("Access-Control-Allow-Origin: *");

    $db_server = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = "QUAN_LY_HOC_SINH";
    $conn = "";

    $conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);


    $class = $_POST['class'];
    $sql = "select * from HOCSINH where ID_LOP = '$class' ";
    $result = mysqli_query($conn, $sql);
    $students = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $students[] = $row;
    };
    mysqli_close($conn);

    header('Content-Type: application/json');
    echo json_encode($students);


?>
