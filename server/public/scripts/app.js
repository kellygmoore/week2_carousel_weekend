var zetaArray = [];
var indexTracker = 0;

$(document).ready(function() {

    console.log("Hello - I'm working!");
    $.ajax({
        type: "GET",
        url: "/data",
        success: function (data) {
            console.log(data);
            getArray(data.zeta);
            createCarousel(zetaArray);
            updateScreen();
            var timer = setInterval(runSlideShow, 10000);
            console.log("This is on AJAX: " + data.zeta.length);
            $(".next").on('click', nextSlide);
            $(".prev").on('click', prevSlide);
        }
    });
});


function getArray(dataArray) {
    zetaArray = dataArray;
    //console.log(zetaArray);
}

function runSlideShow() {
    nextSlide();
}

//if(bool){
//    timer = setInterval(function(){
//        setTimeout(function(){
//        },1000);
//    },1000);
//}else{
//    clearInterval(timer);
//}
//}
//
//$("#set").click(function(e){
//    e.preventDefault();
//    setResetInterval(true);
//});






//appends div main to DOM and creates el variable to point to where we want,
//then calls to create other elements for carousel
function createCarousel(data){
   // $("#container").append("<div class='imageSpot'></div>");
    $("#container").append("<div class='myInfo'></div>");
    $("#container").append("<div class='main'></div>");
    var $el = $("#container").children().last();
    console.log("This is in function createCarousel: " + data.length);
    createLayoutElements(data, $el);
}

function createLayoutElements(array, $el){
    console.log("This is in createLayoutElements: " + array.length);
    $el.append("<button type='button' class='prev btn btn-sm'><span class='glyphicon glyphicon-triangle-left' aria-hidden='true'></span>Previous</button>");
    for(var i = 0; i < array.length; i++) {
        $el.append("<span class='glyphicon glyphicon-pawn tiny index-point' id='index" + i + "'></span>");
    }
    $el.append("<button type='button' class='next btn btn-sm'>Next<span class='glyphicon glyphicon-triangle-right'></span></button>");
}

function nextSlide(){
    indexTracker++;
    if(indexTracker >= zetaArray.length){
        indexTracker = 0;
    }
    $(".myInfo").fadeOut(1000, function(){
        updateScreen();
    });
}

//go to the previous slide by decrementing tracker and then updating
function prevSlide(){
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = zetaArray.length - 1;
    }
    $(".myInfo").fadeOut(1000, function(){
        updateScreen();
    });
}

function updateScreen(){
    //$(".myInfo").delay(5000).fadeIn(3000);
    for(var i = 0; i < zetaArray.length; i++){
        $("#index" + i).removeClass("index-point-active");
        if(i == indexTracker){
            $("#index" + i).addClass("index-point-active");
            console.log(zetaArray[i].imageUrl);
            //$(".imageSpot").fadeIn(2000).html("<p><img src='" + zetaArray[i].imageUrl + "'</p>");
            $(".myInfo").fadeIn(2000).html("<div><p><img src='" + zetaArray[i].imageUrl + "'</p><h2>Name: " + zetaArray[i].name + "</h2><p>Github Link: <a href='" + zetaArray[i].github + "'>" + zetaArray[i].github + "</a></p><p class='italicClass'>Shoutout: " + zetaArray[i].shoutout + "</p>");
        }
    }
}