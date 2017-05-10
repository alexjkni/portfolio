'use strict';
var akConsole, sTimer, deviceMobile;

sTimer = new Date().getTime();
akConsole = akToolKit.console(0, 'Portfolio');
akToolKit.deviceMobile = akToolKit.mobileCheck();

akToolKit.akConsole = akConsole;
akConsole.log('Loading DOM');

jQuery(document).ready(function () {

    var eTimer;

    akConsole.log(akToolKit.checkExecTime(sTimer));

    akConsole.fun(mainFunction);
    mainFunction();

});

function mainFunction() {

    var imgLocationsArr = ['img/head/ls-off.png'];
    akToolKit.preloadImgs(imgLocationsArr);
    
    // Mobile Navigation
    var elemNavBar, elemNavIcon, moved;
    elemNavBar = jQuery('#main-nav');
    elemNavIcon = jQuery('#mobNavIcon');
    
    moved = false;
    
    elemNavIcon.click(function() {
        
        moveNavBarMob(this);
        
    });
    
    if (akToolKit.deviceMobile) {
    
        jQuery('body').on('swiperight', function() {

            moveNavBarMob(elemNavIcon[0]);

        });

        jQuery('body').on('swipeleft', function() {

            moveNavBarMob(elemNavIcon[0]);

        });
        
    }

    function moveNavBarMob(elem) {
        
        jQuery(elem).toggleClass('change', 300);
        elemNavBar.toggleClass('change', 300);
        
        moved = !moved;
        
    }

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

        }, 500, false);
        
        if (moved) {
                
            moveNavBarMob(elemNavIcon[0]);
                
        }

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

        aPopUp.body = jQuery('body');
        aPopUp.aPopUp = jQuery('#aPopUp');
        aPopUp.aPopUpOverlay = jQuery('#aPopUpOverlay');
        aPopUp.aPopUpLink = aPopUpLink;
        aPopUp.aPopUpLeft = aPopUp.aPopUp.find('#aPopUpLeft');
        aPopUp.aPopUpRight = aPopUp.aPopUp.find('#aPopUpRight');
        aPopUp.aPopUpOverlay.loading = aPopUp.aPopUpOverlay.find('img');

        // Sorting out aPopUp First Fade
        aPopUpFadeOut(function () {

            akConsole.log('Sorting Out aPopUp');
            
            aPopUp.aPopUpOverlay.addClass('set');

            aPopUp.aPopUp.addClass('change');

            aPopUp.aPopUpOverlay.loading.fadeOut(300, 'linear');

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

                aPopUpReveal(false, function () {

                    jQuery.ajax({
                        dataType: 'json',
                        url: 'json/' + fileName,
                        success: function (data) {

                            akConsole.log('Workpiece loaded successfully');

                            workPieces[workID] = data[workID];

                            akConsole.log('Pushing to content loader');

                            workPieces[workID].imgPath = 'img/my-work/' + workID.toLowerCase() + '/';

                            contentLoader(workPieces, workID);

                        }
                    });

                });

            } else {

                akConsole.log('WorkPiece has been loaded');
                akConsole.log('Pushing Workpiece to content loader');

                contentLoader(workPieces, workID);

            }

            akConsole.log('Default Prevented');

            function aPopUpReveal(fadeInAPopUp, callback) {
                
                aPopUp.body.addClass('noscroll');

                if (typeof callback !== 'undefined') {

                    aPopUp.aPopUpOverlay.loading.show();

                }

                aPopUp.aPopUpOverlay.fadeIn(300, 'swing', function () {

                    akConsole.log('aPopUpOverlay Faded In');

                    if (typeof callback !== 'undefined') {

                        callback();

                    }

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

                setClass(workID)
                setImages(workPieces[workID]);
                setHeader(workToLoad);
                setContent(workToLoad.detail);

            }

            function setClass(workID) {
                
                aPopUp.aPopUp.addClass(workID);
                aPopUp.aPopUp.currentClass = workID;
                
            }
            
            function setContent(workContent) {

                akConsole.log('Setting Content');

                var elemsToChange;

                workContent = workContent.split('\\n');

                elemsToChange = aPopUp.aPopUpLeft.find('p');

                for (var i = 0; i < elemsToChange.length; i++) {

                    elemsToChange[i].textContent = workContent[i];

                }

                akConsole.log('Content Set');

            }

            function setHeader(workToLoad) {

                akConsole.log('Setting Header');

                var urlText = workToLoad.urlText === '#' ? 'In Development' : workToLoad.urlText;

                aPopUp.aPopUpLeft.find('h3').find('a').text(workToLoad.displayName).attr('href', workToLoad.url);

                aPopUp.aPopUpLeft.find('a.work-site').text(urlText).attr('href', workToLoad.url);

                akConsole.log('Header Set');

            }

            function setImages(workPiece) {

                akConsole.log('Setting Images');

                var elemsToChange, linksToChange, checkImgsLoaded, imagesToSet, iHeight;

                elemsToChange = aPopUp.aPopUpRight.find('a img');
                imagesToSet = workPiece.imagesToSet;
                linksToChange = aPopUp.aPopUpRight.find('a');

                checkImgsLoaded = 0;

                for (var i = 0; i < imagesToSet.length; i++) {

                    akConsole.log(Object.keys(imagesToSet[i])[0]);

                    elemsToChange[i].src = Object.keys(imagesToSet[i])[0];
                    linksToChange[i].href = Object.keys(imagesToSet[i])[0];

                    iHeight = 'auto';

                    /*
                    if (!!workPiece.imageHeights) {

                        iHeight = !!workPiece.imageHeights[(i + 1) + ""];
                        iHeight = iHeight ? parseFloat(workPiece.imageHeights[(i + 1)]) : 'auto';

                        if (akToolKit.deviceMobile && iHeight !== 'auto') {

                            iHeight += 200;

                        }

                        iHeight += iHeight !== 'auto' ? 'px' : '';

                    }
                    */

                    elemsToChange[i].style.height = iHeight;

                    if (typeof elemsToChange[i].onLoadAdded === 'undefined') {

                        elemsToChange[i].onLoadAdded = true;

                        elemsToChange[i].onload = function () {

                            checkImgsLoaded++;

                            akConsole.log('Image ' + checkImgsLoaded + ' Loaded');

                            if (checkImgsLoaded === imagesToSet.length) {

                                akConsole.log('All Images Loaded');

                                checkImgsLoaded = 0;

                                aPopUp.aPopUpOverlay.loading.fadeOut(300, 'swing', function () {

                                    aPopUpReveal(true);

                                });

                            }

                        }

                    }

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
            
            aPopUp.body.removeClass('noscroll');

            aPopUp.aPopUp.fadeOut(300, 'linear', function () {

                akConsole.log('aPopUp Faded Out');
                aPopUp.aPopUp.removeClass(aPopUp.aPopUp.currentClass);

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

        var checkVals, formElem, checkElems, highlightElems;

        checkVals = true;
        formElem = jQuery(this);
        highlightElems = '';

        checkElems = formElem.children('.check');

        checkElems.each(function() {
            
           if (this.value.length === 0 || this.id === 'contactEmail' && !akToolKit.checkEmail(this.value)) {
               
               checkVals = false;
               highlightElems += '#' + this.id + ', ';
               akConsole.log('Input field ' + this.id + ' is invalid, not sending message.');
               
           }
            
        });

        if (!!checkVals) {

            jQuery('#errorMessage').hide();

            jQuery.ajax({
                type: 'POST',
                url: 'php/process.php',
                data: formElem.serialize(),
                success: function (data) {

                    akConsole.log('POST Made, Response Received');

                    if (data.errorCode === '200') {

                        jQuery(data.elemsToHighlight).each(function() {
                            
                            highlightElems += '#' + this + ', ';
                            
                        });
                        
                        incompleteCForm(highlightElems);
                        
                        return false;

                    }

                    var contactMeElem = formElem.parent().parent();

                    contactMeElem.height('908px');

                    formElem.fadeOut(400, function () {

                        contactMeElem.animate({

                            height: '150px'

                        }, 600, function () {

                            var msgSentElem = jQuery('<p>').text('Thanks for your message').hide();
                            contactMeElem.find('.container').append(msgSentElem);
                            msgSentElem.fadeIn(400);

                        });

                    });

                }
            });

        } else {

            incompleteCForm(highlightElems);

        }

    });

    function incompleteCForm(elemsToHighlight) {

        if (jQuery('#errorMessage').length === 0) {

            var errorElem = jQuery('<p>');
            errorElem.attr('id', 'errorMessage');
            errorElem.text("Oops, you haven't filled in the required fields correctly!");
            errorElem.css({
                'color': 'red',
                'padding-bottom': '20px'
            });
            errorElem.insertAfter('#contact-me h4');

        }

        elemsToHighlight = elemsToHighlight.substr(0, elemsToHighlight.length - 2);
        jQuery(elemsToHighlight).css({
            'background': 'red'
        }).keypress(function() {
            
            jQuery(this).css({'background': '#38b9be'});
            
        });

    }

    // My Technologies Animation
    var techBarsFull = false;

    $(window).scroll(function () {

        var tE, hT, hH, wH, wS, tH, tT;

        tE = jQuery('#my-technologies');
        hT = tE.offset().top;
        hH = tE.outerHeight();
        wH = jQuery(window).height();
        wS = jQuery(this).scrollTop();
        tH = tE.find('.tech-bar:eq(0)').height();
        tT = akToolKit.deviceMobile ? 1000 : 0;

        if ((wS + tT) > (hT + hH - wH)) {
            
            var attr = tH !== 25 ? true : false;

            if (techBarsFull === false) {

                akConsole.log('User Reached My Technology Elements');

                animateTechBars(attr);

            }

        }

    });

    function animateTechBars(attr) {

        akConsole.log('Animating Tech Bars');

        techBarsFull = true;

        var elemsToAnimate = jQuery('#my-tech-container .tech-bar-fill').each(function () {

            var curElem, newVal, animTime;

            animTime = Math.floor(Math.random()*(2500-2000+1)+2000);
            curElem = jQuery(this);
            newVal = this.parentElement.parentElement.children[1].innerText;
            
            var animObj = attr ? {"height": newVal} : {"width": newVal};

            curElem.animate(animObj , animTime, 'easeOutBounce');

        });

    }

}
