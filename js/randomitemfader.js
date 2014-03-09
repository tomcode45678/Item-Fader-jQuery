/**
 * Created by Thomas Stapleton on 08/03/14.
 * www.tomsta.co.uk
 * uses jQuery 1.9.1
 * jQuery migrate NOT used or needed for this script
 */


/**
 * Global Variables
 * @items                  array  | items to fade in and out
 * @width                  int    | width of fader wrapper
 * @height                 int    | height of fader wrapper
 * @font                   int    | font size of text faded in/out
 * @acceptDomList          string | list of elements that can be added and faded in or out (first element found in list will be used)
 * @acceptWidthHeightList  string | list of elements that can be used to get the width and height first element found in list will be used)
 */
var items = [], width, height, fontSize, acceptDomList = 'div,p,h2,h3,h4,img', acceptWidthHeightList = 'div,span,img';

/**
 * execute when the domain object model (DOM) has loaded
 */
$(document).ready(function(){
    //get hidden items, add to array
    $('ul#items li').each(function(){ items.push($(this).html()); });
    //set width and height variables
    width = $("#faderWrapper").width(); height = $("#faderWrapper").height();
    //set height of div stops adding height of new DOM element (stops jumping when item is updated)
    $("#faderWrapper").css({height:height});
    //set font size based on fade in out area size
    fontSize = (width+height)/20;
    //update items
    updateItems();
    //set loop to update items constantly
    setInterval(function(){ updateItems(); }, 3500);
});

/**
 * function to update items
 */
function updateItems(){
    //update html of fader and set css of specified html element
    $("#faderWrapper").html(items[0]).find(acceptDomList).css({display: "none", position: "relative", zIndex: 20, fontSize: fontSize, top: getRandomInt(20, height-$("#faderWrapper").find(acceptWidthHeightList).height()), left: getRandomInt(20, (width/1.5)-$("#faderWrapper").find(acceptWidthHeightList).width())}).fadeIn(500);
    //remove item from array
    items.splice(items[0], 1);
    //add item back to array at the end e.g. before = [1,2,3,4] after = [2,3,4,1]
    items.push($("#faderWrapper").find(acceptDomList));
    //find html element to fade out and delay for reading time and then fade out
    $("#faderWrapper").find(acceptDomList).delay(1000).fadeOut(500);
}

/**
 * function to check window size and update tablet and mobile orientation
 */
$(window).on("resize", function(){
    //update window height and width variables used in other functions
    width = $("#faderWrapper").width();
    height = $("#faderWrapper").height();
    //reset height dependent on new screen size
    $("#faderWrapper").css({height:height});
    //set font from new screen size
    fontSize = (width+height)/20;
});

/**
 * get a random number between a lower and higher number expects two integers the first smaller than the last
 * @param min
 * @param max
 * @returns int | random number between specified min and max number
 */
function getRandomInt(min, max){
    //return the random whole number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}