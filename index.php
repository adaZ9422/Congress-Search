<?php 
$detail = $_GET['detail'];
$url = "http://104.198.0.197:8080/".$detail;
$file=file_get_contents($url);
if(isset($_GET['callback'])){
    header("Content-Type:application/json");
    echo $_GET['callback']."(".$file.")";
}
;?>