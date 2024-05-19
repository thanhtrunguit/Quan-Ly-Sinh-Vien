<?php
    header("Access-Control-Allow-Origin: *");

    $db_server = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = "studentdb";
    $conn = "";

    $conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

//    $name = $_POST['name'];
//    $gender = $_POST["gender"];
//    $dob = $_POST["dob"];
//    $email = $_POST["email"];
//    $address = $_POST["address"];
//    $id = $_POST["id"];
//
//    $class = $_POST['class'];
//    echo ($class);
//    $sql = "INSERT INTO studentInfo (NAME, GENDER, DOB, EMAIL, ADDRESS, id, MALOP)
//                            VALUES ('$name', '$gender', '$dob', '$email' ,'$address' , '$id')";
//$sql = "INSERT INTO studentInfo (NAME, GENDER, DOB, EMAIL, ADDRESS, id, MALOP)
//                            VALUES ('trung6', 'male', '2004-01-11', 'ntt' ,'hcm' , '6', '10A1')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO studentInfo (NAME, GENDER, DOB, EMAIL, ADDRESS, id, MALOP)
//                            VALUES ('trung7', 'male', '2004-01-11', 'ntt' ,'hcm' , '7', '10A1')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO lop (MALOP, TENLOP)
//                                VALUES ('10A1', '10A1')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO lop (MALOP, TENLOP)
//                                VALUES ('10A2', '10A2')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO chitietdiem (`id`, `MAMON`, `HOCKY`, `diem15`, `diem45`, `diemTB`)
//    VALUES ('1', 'test', '2', '10', '10', '10')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO chitietdiem (`id`, `MAMON`, `HOCKY`, `diem15`, `diem45`, `diemTB`)
//    VALUES ('2', 'test', '2', '10', '10', '10')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO chitietdiem (`id`, `MAMON`, `HOCKY`, `diem15`, `diem45`, `diemTB`)
//    VALUES ('3', 'test', '2', '10', '10', '10')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO chitietdiem (`id`, `MAMON`, `HOCKY`, `diem15`, `diem45`, `diemTB`)
//    VALUES ('1', 'test', '1', '9', '10', '9.5')";
//mysqli_query($conn, $sql);
//$sql = "INSERT INTO chitietdiem (`id`, `MAMON`, `HOCKY`, `diem15`, `diem45`, `diemTB`)
//    VALUES ('2', 'test', '1', '9', '9', '9')";
//mysqli_query($conn, $sql);


    $class = $_POST['class'];
    $sql = "select * from studentInfo where MALOP = '$class' ";
    $result = mysqli_query($conn, $sql);
    $students = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $students[] = $row;
    };
    mysqli_close($conn);

    header('Content-Type: application/json');
    echo json_encode($students);


?>
