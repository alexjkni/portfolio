'use strict';

var akToolKit = {};

// Return's a console function
akToolKit.console = function (akConsoleSwitch, name) {
    
    var objProps, retObj;
    
    objProps = ['log', 'dir', 'err', 'fun'];
    retObj = {};
    
    for (var i = 0; i < objProps.length; i++) {
        
        retObj[objProps[i]] = function() {
            return false;
        }
        
    }
    
    if (!!akConsoleSwitch) {
        
        retObj.log = function(message) {
            
            window.console.log(name + ' | ' + message);
            
        };
        
        retObj.dir = function(object) {
            
            retObj.log('Exposing Object');
            window.console.dir(object);
            
        };
        
        retObj.err = function(error) {
            
            retObj.log('Error Occurred!');
            window.console.error(error);
            
        };
        
        retObj.fun = function(func) {
            
            retObj.log('Function ' + akToolKit.getFunctionName(func) + ' Called');
            
        }
        
    }
    
    return retObj;
    
}

// Checks Execution Time of code
akToolKit.checkExecTime = function(startTime) {
    
    var endTimer, retMsg;
    
    endTimer = new Date().getTime() - startTime;
    
    retMsg = 'DOM Loaded, Took ' + endTimer + 'ms';
    
    if (endTimer > 5000) {
        
        retMsg = 'WARNING, DOM TOOK ' + endTimer + ' to load!!!';
        
    }
    
    return retMsg;
    
}

// Returns Function Name
akToolKit.getFunctionName = function(func) {
    
    var retStr;
    
    func = func.toString();
    retStr = func.substring('function '.length, func.indexOf('('));
    retStr = retStr.length === 0 ? "Anonymous Function" : retStr;
    
    return retStr;
    
}

// Switches Images
akToolKit.switchImgController = function(type, elemToChange, newImg) {
    
    var funcToCall;
    
    akConsole.log('Type is ' + type);
    
    switch (type.toLowerCase()) {
            
        case 'bg' :
            funcToCall = switchBackground;
            break;
        case 'img' :
            funcToCall = switchSource;
            break;
        default:
            return akConsole.log('Incorrect Parameter Passed');
            break;
            
    }
    
    akConsole.fun(funcToCall);
    funcToCall(elemToChange);
    
    function switchBackground(elemToChange) {
        
        akConsole.log('Attempting to Change Background');
        
        elemToChange.css('background-image', 'url(' + newImg + ')');
        
    }
    
    function switchSource(elemtoChange) {
        
        akConsole.log('Attemping to Change Source');
        
    }
    
}

// Preload Images
akToolKit.preloadImgs = function(imgLocArr) {
    
    if (!imgLocArr || imgLocArr.length === 0) {
        
        return akConsole.log('No Images to Load');
        
    }
    
    akToolKit.preloadImgs.loadedImgs = {};
    
    var loadedImgs = akToolKit.preloadImgs.loadedImgs;
    
    for (var i = 0; i < imgLocArr.length; i++) {
        
        var my_image = new Image();
        my_image.src = imgLocArr[i];
        
        loadedImgs[imgLocArr[i]] = my_image;
        
    }
    
    return loadedImgs;
    
}

// Create Cookie
akToolKit.createCookie = function (cname, cvalue, exdays) {
    
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    
}

// Get Cookie
akToolKit.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Check if Device is mobile
akToolKit.mobileCheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// Checks if parameter is an email.
akToolKit.checkEmail = function(emailToCheck) {
    
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return re.test(emailToCheck);
    
}