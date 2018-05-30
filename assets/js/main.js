/**************************************************
 *
 * Functions for [project name]
 * AUTHOR   David Leger
 *          www.davidleger.me
 *
 **************************************************/

$(document).ready(function(){

    //bgColor();
    mobileNav();
    randomQuote();
});
/*
// Randomizes the background color excluding darker tones.
function bgColor(){
    var randColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    //console.log(randColor);
    $('body').css('background', randColor);
}
*/
function mobileNav(){
    $('.menu-icon').on('click', function(){
        $('.navbar-wrapper, .menu-icon span').toggleClass('nav-active');
    });
}

// Grabs a random quote from quote.json
function randomQuote(){
    //alert("hi");
    $.getJSON("/whitespace/assets/js/quotes.json", function(result){
        //alert(result);
        var max = result.quotes.length;
        var quoteIndex = Math.floor(Math.random()*max);
        //console.log(quoteIndex);
        
        $('.quote').text('"' + result.quotes[quoteIndex].quote + '"');
        $('.quote-credit').text('- ' + result.quotes[quoteIndex].person);
    });
}
