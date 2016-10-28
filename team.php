<?php
	try{
		require_once "./Twig/Autoloader.php";
		Twig_Autoloader::register();
		$loader = new Twig_Loader_Filesystem('templates');
		$twig = new Twig_Environment($loader);
		if(isset($_GET['team'])){
			$team = $_GET['team'];
			echo $twig->display('team/'.$team.'.html');
		}else {
			header('Location: /404.php');
			exit;
		}
	} catch(Twig_Error_Loader $e){
		header('Location: /404.php');
		exit;
	}
?>
