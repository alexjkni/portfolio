'use strict';
var akConsole, sTimer, deviceMobile;

sTimer = new Date().getTime();
akConsole = akToolKit.console(1, 'Portfolio');
akToolKit.deviceMobile = akToolKit.mobileCheck();

akToolKit.akConsole = akConsole;
akConsole.log('Loading DOM');

executeBeforeLoad();

jQuery(document).ready(function () {

    var eTimer;

    akConsole.log(akToolKit.checkExecTime(sTimer));

    akConsole.fun(mainFunction);
    mainFunction();

});

function executeBeforeLoad() {

    // Device Specific Functions
    if (akToolKit.deviceMobile) {

        var elemNavBar = jQuery('#main-nav');

        addNavElems(elemNavBar, 'click');

    }

}

function addNavElems(navBar, addEvent) {

    var elemToAdd, navWidth;

    elemToAdd = jQuery('<span>').text('<').addClass('closeBtn').insertBefore(navBar.children('ul'));
    navWidth = (navBar.width() + 100) + 'px';

    if (typeof addEvent !== 'undefined') {

        elemToAdd.on(addEvent, function () {

            navBar.animate({
                marginLeft: '-' + navWidth
            }, 300, 'swing');

            akConsole.log('Event Clicked');

        });

    }

}

function mainFunction() {

    var imgLocationsArr = ['img/head/ls-off.png'];
    akToolKit.preloadImgs(imgLocationsArr);

    // Smooth Scrolling
    jQuery('#main-nav a, #info a').click(function (e) {

        akConsole.log('Menu Link Clicked, Preventing Default');

        e.preventDefault();

        akConsole.log('Grabbing Element ID from href');

        var elemID = this.href.substr(this.href.indexOf('#') + 1);

        akConsole.log('elemID is ' + elemID);
        akConsole.log('Scolling to Element');

        jQuery('html, body').animate({

            scrollTop: jQuery('#' + elemID).offset().top

        }, 500, function () {

            akConsole.log('Finished Scrolling');

        });

    });

    // Light Logic
    jQuery('#ls-switch').click(function (e) {

        var elemToSwitch, imgToSwitch, elemShade, overlayElem;

        akConsole.log(e.type + ' event occurred');

        elemToSwitch = jQuery('#ls');
        imgToSwitch = elemToSwitch.css('background-image').indexOf('ls-on.png');
        elemShade = 'rgba(0, 0, 0, ';
        overlayElem = jQuery('#ls-shade');

        switch (imgToSwitch) {

            case -1:
                imgToSwitch = 'img/head/ls-on';
                elemShade += '0.07)';
                break;
            default:
                imgToSwitch = 'img/head/ls-off';
                elemShade += '0.28)';
                break;

        }

        imgToSwitch += '.png';

        akConsole.fun(akToolKit.switchImgController);
        akToolKit.switchImgController('bg', elemToSwitch, imgToSwitch);

        setTimeout(function () {

            overlayElem.css('background', elemShade);

        }, 10);

        akConsole.log(elemToSwitch[0].id + ' background is now ' + imgToSwitch);
        akConsole.log(overlayElem[0].id + ' is now ' + elemShade);

    });

    // Logo Spin Logic
    jQuery('.j-spin').mouseover(function (e) {

        akConsole.log('Spin This');

    });

    // Preloading My Technologies Work

    var aPopUpLink = jQuery('.popLink');

    function preloadMyTech() {



    }

    // aPopUp Event Listeners
    (function () {

        var workPieces, aPopUp;

        workPieces = aPopUp = {};

        aPopUp.aPopUp = jQuery('#aPopUp');
        aPopUp.aPopUpOverlay = jQuery('#aPopUpOverlay');
        aPopUp.aPopUpLink = aPopUpLink;
        aPopUp.aPopUpLeft = aPopUp.aPopUp.find('#aPopUpLeft');
        aPopUp.aPopUpRight = aPopUp.aPopUp.find('#aPopUpRight');

        // Sorting out aPopUp First Fade
        aPopUpFadeOut(function () {

            akConsole.log('Sorting Out aPopUp');

            aPopUp.aPopUpOverlay.css('margin', '0');
            aPopUp.aPopUp.css('margin', '-275px 0 0 -325px');

            akConsole.log('aPopUp Sorted Out')

        });

        aPopUp.aPopUpLink.click(function (e) {

            akConsole.log('aPopUp Link Clicked, Preventing Default');

            e.preventDefault();

            var workID = this.parentElement.id;

            akConsole.log(workID);

            if (!workPieces[workID]) {

                var fileName = workID.toLowerCase() + '.json';

                akConsole.log('WorkPiece has not been loaded');
                akConsole.log('Attemping to load workpiece');
                
                aPopUpReveal(false);

                jQuery.ajax({
                    dataType: 'json',
                    url: 'json/' + fileName,
                    complete: function (jqXHR, status) {
                        
                        if (/^success|notmodified$/.test(status)) {
                            
                            akConsole.log('Workpiece loaded successfully');
                            
                            workPieces[workID] = jQuery.parseJSON(jqXHR.responseText)[workID];
                            
                            akConsole.log('Pushing to content loader');

                            workPieces[workID].imgPath = 'img/my-work/' + workID.toLowerCase() + '/';

                            contentLoader(workPieces, workID);
                            
                        }

                    },
                    success: function (data) {
                    
                        aPopUpReveal(true);
                        
                    }
                });

            } else {

                akConsole.log('WorkPiece has been loaded');
                akConsole.log('Pushing Workpiece to content loader');

                contentLoader(workPieces, workID);
                
                akConsole.log('Fading aPopUp Elements In');
                
                aPopUpReveal(true);

            }

            akConsole.log('Default Prevented');

            function aPopUpReveal(fadeInAPopUp) {

                aPopUp.aPopUpOverlay.fadeIn(300, 'swing', function () {

                    akConsole.log('aPopUpOverlay Faded In');

                });

                if (fadeInAPopUp) {

                    aPopUp.aPopUp.fadeIn(500, 'swing', function () {

                        akConsole.log('aPopUp Faded In');

                    });

                }

            }

            function contentLoader(workPieces, workID) {

                var imagesToSet;
                var workToLoad = workPieces[workID];

                if (typeof workPieces[workID].imagesToSet === "undefined") {

                    workPieces[workID].imagesToSet = loadImages(workToLoad);

                }

                setImages(workPieces[workID].imagesToSet);
                setHeader(workToLoad.displayName);
                setContent(workToLoad.detail);

            }

            function setContent(workContent) {

                akConsole.log('Setting Content');

                var elemsToChange;

                workContent = workContent.split('\\n');

                elemsToChange = aPopUp.aPopUpLeft.find('p');

                for (var i = 0; i < workContent.length; i++) {

                    elemsToChange[i].textContent = workContent[i];

                }

                akConsole.log('Content Set');

            }

            function setHeader(workName) {
                jQuery('#aPopUpLeft').find('h3')

                akConsole.log('Setting Header');

                aPopUp.aPopUpLeft.find('h3').text(workName);

                akConsole.log('Header Set');

            }

            function setImages(imagesToSet) {

                akConsole.log('Setting Images');

                var elemsToChange, linksToChange;

                elemsToChange = aPopUp.aPopUpRight.find('a img');
                linksToChange = aPopUp.aPopUpRight.find('a');


                for (var i = 0; i < imagesToSet.length; i++) {

                    akConsole.log(Object.keys(imagesToSet[i])[0]);

                    elemsToChange[i].src = Object.keys(imagesToSet[i])[0];
                    linksToChange[i].href = Object.keys(imagesToSet[i])[0];

                }

                akConsole.log('Images have been set');

            }

            function loadImages(workToLoad) {

                akConsole.log('Loading Images');

                var images, loadedImages;

                images = workToLoad.images;
                loadedImages = [];

                for (var key in images) {

                    var thisImage = akToolKit.preloadImgs([workToLoad.imgPath + images[key]]);

                    loadedImages.push(thisImage);

                }

                akConsole.log('Images Loaded');

                return loadedImages;

            }

        });

        aPopUp.aPopUpOverlay.click(aPopUpFadeOut);
        aPopUp.aPopUp.find('#aPopUpClose').click(aPopUpFadeOut);

        function aPopUpFadeOut(callback) {

            aPopUp.aPopUp.fadeOut(300, 'linear', function () {

                akConsole.log('aPopUp Faded Out');

            });

            aPopUp.aPopUpOverlay.fadeOut(300, 'linear', function () {

                akConsole.log('aPopUpOverlay Faded Out');

                if (typeof callback === 'function') {

                    callback();

                }

            });

        }

    })();

    // Contact Me Form
    jQuery('#contactMeForm').submit(function (e) {

        akConsole.log('Preventing Default');

        e.preventDefault();

        akConsole.log('Default Prevented');
        akConsole.log('Attempting POST Call');

        jQuery.post(
            'php/process.php',
            jQuery(this).serialize(),
            function (data) {

                akConsole.log('POST Made, Response Received');

                akConsole.log(data);

                akToolKit.createCookie('cfSub', '1');

            }
        );

    });

    // My Technologies Animation
    var techBarsFull = false;

    $(window).scroll(function () {

        var tE, hT, hH, wH, wS;

        tE = jQuery('#my-technologies');
        hT = tE.offset().top;
        hH = tE.outerHeight();
        wH = jQuery(window).height();
        wS = jQuery(this).scrollTop();

        if ((wS + 200) > (hT + hH - wH)) {

            if (techBarsFull === false) {

                akConsole.log('User Reached My Technology Elements');

                animateTechBars();

            }

        }

    });

    function animateTechBars() {

        akConsole.log('Animating Tech Bars');

        techBarsFull = true;

        var elemsToAnimate = jQuery('#my-tech-container .tech-bar-fill').each(function () {

            var curElem, newHeight;

            curElem = jQuery(this);
            newHeight = this.parentElement.parentElement.children[1].innerText;

            curElem.animate({
                height: newHeight
            }, 1500);

        });

    }

}
