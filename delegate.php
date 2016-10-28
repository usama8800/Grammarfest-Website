<?php
	try{
		require_once "./Twig/Autoloader.php";
		Twig_Autoloader::register();
		$loader = new Twig_Loader_Filesystem('templates');
		$twig = new Twig_Environment($loader);
		if(isset($_GET['num'])) {
			$num = $_GET['num'];
			echo $twig->display('delegate.html', array('num'=>$num));
		}else {
			echo 'error';
			exit;
		}
	} catch(Twig_Error_Loader $e){
		echo 'error';
		exit;
	}
?>
