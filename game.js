var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;


//When game starts
$(document).ready(function () {

$(document).keydown(function(){
    if (!started){

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
});

//Handle a click, adds color to user clicked pattern, animates, plays sound

$(".btn").click (function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


});

//Plays audio
function playSound(name){

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//function triggered on click
function nextSequence(){

    //player's level update title
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //jQuery and flashing effect
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //plays audio
    playSound(randomChosenColour);

}

//Function that animates the press

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    
    }, 100);
}


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // If the user has completed the current sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
             } , 1000);

            //userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        // css wrong
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
            }, 200);

        // reset variables
        startOver();
    }}

    function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
    } 