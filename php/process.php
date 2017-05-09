<?php

    sendMail();

    function sendMail() {
    
        $contactDetails = $_POST;
        
        $messageArr = array();
        $messageArr['contactName'] = $contactDetails['contactName'];
        $messageArr['contactEmail'] = $contactDetails['contactEmail'];
        $messageArr['contactCompany'] = $contactDetails['contactCompany'];
        $messageArr['contactMessage'] = $contactDetails['contactMessage'];
        
        $highlightElems = array();
        $highlightElems['errorCode'] = '100';
        $highlightElems['elemsToHighlight'] = array();
            
        foreach($messageArr as $idx => $value) {
            
            if ($idx === 'contactCompany') {
                
                continue;
                
            }
            
            if (strlen($value) === 0) {
                
                $highlightElems['errorCode'] = '200';
                array_push($highlightElems['elemsToHighlight'], $idx);
                
            }
        
        }    
        
        if ($highlightElems['errorCode'] === '200') {
            
            header('Content-Type: application/json');
            echo json_encode($highlightElems);
            return false;
            
        } else {

            $emailTo = 'alexjkni@gmail.com';
            $emailSubject = 'AJK - Portfolio | Contact Form - '.$contactDetails['contactCompany'];
            $emailHeaders = 'From: '.$contactDetails['contactEmail'];

            if(mail("alexjkni@gmail.com", $emailSubject, $contactDetails['contactMessage'], $emailHeaders)) {

                header('Content-Type: application/json');
                echo json_encode($highlightElems);
                return true;

            } else {

                echo 'Mail Not Sent';

            }
            
        }
        
    }

?>
