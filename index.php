<?php
	try{
		require_once "./Twig/Autoloader.php";
		Twig_Autoloader::register();
		$loader = new Twig_Loader_Filesystem('templates');
		$twig = new Twig_Environment($loader);
		echo $twig->display('index.html');
	} catch(Twig_Error_Loader $e){
		header('Location: /404.php');
	}
?>
