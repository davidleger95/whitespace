/**************************************************
 *
 * Functions for [project name]
 * AUTHOR   David Leger
 *          www.davidleger.me
 *
 **************************************************/

$(document).ready(function(){

    bgColor();
    mobileNav();
});

// Randomizes the background color.
function bgColor(){
    var randColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    console.log(randColor);
    $('body').css('background', randColor);
}

function mobileNav(){
    $('.menu-icon').on('click', function(){
        $('.navbar-wrapper, .menu-icon span').toggleClass('nav-active');
    })
}