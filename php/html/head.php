<head>
    <meta charset="utf-8">
    <meta http-equiv="Cache-control" content="public">

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
    
    <style>
        #main-loader {
            display:block;
            font-family: verdana;
            position:fixed;
            margin:-20px 0 0 0;
            top:50%;left:0;
            width:100%;height:auto;
        }
        #main-loader img {
            display:block;
            margin: 0 auto;
            width:3vw;
        }
        #main-loader p {
            font-size:1vw;
            text-align: center;
        }
        body.hidden > * {
            display:none;
        }
    </style>

</head>
