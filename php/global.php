<?php

//Site Settings
$DOCTYPE = "<!doctype html>";
$SITENAME = "Portfolio | Alexander James Knight";

//Head Information
$AUTHOR = "Alexander James Knight";
$CSSPATH = "./css/";
$HTMLSHIVSRC = "https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js";

//CSS Name Files

function getFileFromPath($path ,$fileNameArr) {
    
    foreach($fileNameArr as $fileName) {
        
        echo '<noscript><link rel="stylesheet" href="' . $path . $fileName. '"></noscript>';
      
    }
    
}

?>