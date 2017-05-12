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
    
        // Adding HTML5Shiv File
        require('htmlshiv.php'); 
    
    ?>
    
    <style>
        body > * {
            opacity:0;
            
            -webkit-transition: opacity 1s ease-in;
            -moz-transition: opacity 1s ease-in;
            -ms-transition: opacity 1s ease-in;
            -o-transition: opacity 1s ease-in;
            transition: opacity 1s ease-in;
        }
        #main-loader, #main-loader img {
            display:block;
        }
        #main-loader {
            display:block;
            font-family: verdana;
            opacity:1;
            position:fixed;
            margin:-50px 0 0 -50px;
            top:50%;left:50%;
            width:100px;height:100px;
            
            -webkit-transition: opacity 0.5s ease-in;
            -moz-transition: opacity 0.5s ease-in;
            -ms-transition: opacity 0.5s ease-in;
            -o-transition: opacity 0.5s ease-in;
            transition: opacity 0.5s ease-in;
        }
        #main-loader img {
            margin: 0 auto;
            width:50%;
        }
        #main-loader p {
            font-size:0.9em;
            margin:10px 0 0 0 !important;
            text-align: center;
        }
    </style>

</head>