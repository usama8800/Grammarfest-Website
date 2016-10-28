<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$pics_dir = "uploads/";
$error = array();
$upload_errs = array();

require_once "./Twig/Autoloader.php";
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem('templates');
$twig = new Twig_Environment($loader);

if(isset($_POST['id'])){
	$error['submitted'] = 'yes';
	$id = $_POST['id'];
	$array = array_values($_FILES);
	for ($i = 0; $i < count($_FILES); $i++) {
		$target_file = $pics_dir . basename($array[$i]["name"]);
		$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
		$target_file = $pics_dir . $id . '-member-' . ($i+1) . '.png';
		$check = getimagesize($array[$i]["tmp_name"]);
		if($check !== false) {
			if(!move_uploaded_file($array[$i]["tmp_name"], $target_file)){
				array_push($upload_errs, $array[$i]['name']);
			}
		} else {
			array_push($upload_errs, $array[$i]['name']);
		}
	}
	try{
		// $mysqli = new mysqli("localhost", "root", "", "registration");
		// $mysqli = mysqli_connect("fdb6.biz.nf", "1433560_db", "alpha1234", "1433560_db");
		$mysqli = mysqli_connect("localhost", "grammarf_admin", "{vB#Z?V]k^i#", "grammarf_db");
		if ($mysqli->connect_errno) throw new Exception("ce");
		
		if(!$stmt = $mysqli->prepare("INSERT INTO `teams` VALUES (?, ?, ?, ?, ?, ?)")) {
			throw new Exception($mysqli->error);
		}
		$stmt->bind_param('sssssi', $id, $team_name, $team_branch, $team_email, $team_address, $team_accomodations);
		$team_name = $_POST['institution-name'];
		$team_branch = $_POST['institution-branch'];
		$team_email = $_POST['institution-email'];
		$team_address = $_POST['institution-address'];
		$team_accomodations = $_POST['institution-accomodations']=='Yes';
		$stmt->execute();
		
		$sa_name = $_POST['staff-advisor-name'];
		$sa_number = $_POST['staff-advisor-number'];
		$sa_email = $_POST['staff-advisor-email'];
		$sa_nic = $_POST['staff-advisor-nic'];
		if(!empty($sa_name) || !empty($sa_number) || !empty($sa_email) || !empty($sa_nic)) {
			if(!$stmt = $mysqli->prepare("INSERT INTO `staff_advisors` VALUES (?, ?, ?, ?, ?)")){
				throw new Exception($mysqli->error);
			}
			$stmt->bind_param('issss', $id, $sa_name, $sa_email, $sa_number, $sa_nic);
			$stmt->execute();
		}
		
		if(!$stmt = $mysqli->prepare("INSERT INTO `delegates` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")){
			throw new Exception($mysqli->error);
		}
		$stmt->bind_param('ssssssssis', $d_id, $d_name, $d_pic, $d_number, $d_email, $d_event1, $d_event2, $d_event3, $d_isHead, $id);
		for($i = 0; $i < count($_FILES); $i++){
			$num = $i+1;
			$d_id = $id . '-member-'. $num;
			$d_name = $_POST['delegate-' . $num . '-name'];
			$d_pic = $id . '-member-'. $num;
			$d_number = $_POST['delegate-' . $num . '-number'];
			$d_email = $_POST['delegate-' . $num . '-email'];
			$d_event1 = $_POST['delegate-' . $num . '-event-1'];
			$d_event2 = $_POST['delegate-' . $num . '-event-2'];
			$d_event3 = $_POST['delegate-' . $num . '-event-3'];
			$d_isHead = $i == 0 ? 1 : 0;
			$stmt->execute();
		}
	}catch(Exception $e){
		$message = $e->getMessage();
		if($message == '') $message = 'error';
		$error['database_error'] = $message;
	}
}

$error['upload_errs'] = $upload_errs;
echo $twig->display('form.html', $error);

?>