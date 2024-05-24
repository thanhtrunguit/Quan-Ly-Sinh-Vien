<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "QUAN_LY_HOC_SINH";
$conn = "";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);
$username = '';
$password = '';
if($_POST['username']){
    $username = $_POST['username'];
}
if($_POST['password']){
    $password = $_POST['password'];
}
//$username = $_POST['username'];
//$password = $_POST['password'];
if($username != "" && $password != ""){
    $USERROLE = "SELECT LOAI_TAIKHOAN FROM TAI_KHOAN WHERE ID_TAIKHOAN = '$username' AND MAT_KHAU = '$password' ";
    $userrrole_check = mysqli_query($conn, $USERROLE);
    if(mysqli_num_rows($userrrole_check) > 0){
        $rowhk = mysqli_fetch_assoc($userrrole_check);
        $userrole = $rowhk['LOAI_TAIKHOAN'];
        echo json_encode($userrole);
    }}

//if($username != "" && $password == ""){
//    $MALOP = "SELECT MALOP
//                FROM giaovien
//             WHERE MATAIKHOAN = '$username'";
//    $malop = mysqli_query($conn, $MALOP);
//    if(mysqli_num_rows($malop) > 0){
//        $rowhk = mysqli_fetch_assoc($malop);
//        $malopgv = $rowhk['MALOP'];
//        echo json_encode($malopgv);
//    }}



mysqli_close($conn);

?>



