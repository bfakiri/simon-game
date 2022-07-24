
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function playSound(chosenColor){
    var audio = new Audio("sounds/"+chosenColor+'.mp3');
    audio.play();
}

function nextSequence(){
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 500);
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    if(gamePattern.length == userClickedPattern.length){
        checkAnswer(level);
        userClickedPattern = [];
    }
});
//nextSequence();



$(document).keydown(function (e) {
    if(level == 0){
        nextSequence();
    }
    else
    console.log("level higher then 0");  
});

function checkAnswer(currentLevel){
    let result = false;
    for(let i = 0; i < currentLevel; i++){
        if(gamePattern[i] !== userClickedPattern[i]){
            result = false;
            break;
        }
        else
            result = true;
        }
    if (result == true){
        nextSequence();
    }
    else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 1000);
    $("h1").text("GAME OVER ! Click a key to restart");
    console.log("game over");
    //$('.btn').off('click');
    reset();
}
}
function reset(){
    level = 0;
    gamePattern = [];
}


