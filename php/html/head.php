<head>
    <meta charset="utf-8">

    <title><?php echo $SITENAME; ?></title>
    <meta name="description" content="<?php echo $SITENAME; ?>">
    <meta name="author" content="<?php echo $AUTHOR; ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php 
    
        // Adding CSS Files
        $cssNames = ["reset.css","style.css"];
        getFileFromPath($CSSPATH, $cssNames); 
    
        // Adding HTML5Shive File
        require('htmlshiv.php'); 
    
    ?>

</head>
