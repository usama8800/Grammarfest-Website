<?php
	require_once "./Twig/Autoloader.php";
	Twig_Autoloader::register();
	$loader = new Twig_Loader_Filesystem('templates');
	$twig = new Twig_Environment($loader);
	$img = mt_rand(1, iterator_count(new FilesystemIterator("static/res/images/404", FilesystemIterator::SKIP_DOTS)));
	echo $twig->display('404.html', array('img' => $img));
?>
