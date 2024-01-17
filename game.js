var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = "";
var userClickedPattern = [];
var gamePattern = [];
var clicks = 0;
var level=1;
//start playing
$(".play-img").on("click", function (event) {
    $("h1").text("Level "+level);
    randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    window.setTimeout(function(){
        blink(gamePattern[0]);
        playSound(gamePattern[0]);
    },1000);

        window.setTimeout(() => {
               ableButtons();
            }, 2000);
    $(this).css("visibility","hidden");
});

function nextSequence(level){
    var x = Math.random();
    x = x * 4;
    var randomNumber = Math.floor(x);
    return randomNumber;
}

function playSound(name){
    var audio = new Audio("audio/"+name+"Audio.mp3");
    audio.play();
}
function victory(){
    var audio = new Audio("audio/ganar.mp3");
    audio.play();
    level++;
    
    $(".btn").attr("disabled", "true");
    $("h1").text("Victory!");
     for (let i = 1; i < 4; i++) {
        setTimeout(() => { 
            for (var index = 0; index < 4; index++) {
                $("h1").text("comenzando siguiente nivel... "+i);
             }
        }, i * 1000);
      }
     window.setTimeout(function(){
        newLevel(level);
        userClickedPattern = [];
        clicks = 0;
     },4000);

}
function lose(){
    $(".small-box").css("display", "flex");
    $("h1").text("You lose!");
    $("h2").text("Try Again?");
    $("h2").css("font-size", "2rem");
    $(".btn").attr("disabled", "true");
    $(this).hide();
    var audio = new Audio("audio/perder.mp3");
    audio.play();
    
}
function ableButtons(){
    debugger
    $(".btn").removeAttr("disabled");
}
function newLevel(level){
    var i = 0;
    $("h1").text("Level "+level);
    randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            blink(gamePattern[i]);
            playSound(gamePattern[i]);
            if(i == gamePattern.length-1){
               ableButtons();
            }
            }, i * 2000);
      }
    

}

function blink(randomChosenColour){
switch (randomChosenColour) {
    case "green":
         $("."+randomChosenColour).addClass("green-blink");
            setTimeout(() => { 
                $("."+randomChosenColour).removeClass("green-blink");    
         }, 1000*1.5);
        break;
    case "blue":
        $("."+randomChosenColour).addClass("blue-blink");
        setTimeout(() => { 
            $("."+randomChosenColour).removeClass("blue-blink");
        }, 1000*1.5);
        break;
    case "red":
        $("."+randomChosenColour).addClass("red-blink");
        setTimeout(() => { 
            $("."+randomChosenColour).removeClass("red-blink");
        }, 1000*1.5);
        break;
    case "yellow":
        $("."+randomChosenColour).addClass("yellow-blink");
        setTimeout(() => { 
            $("."+randomChosenColour).removeClass("yellow-blink");
        }, 1000*1.5);
        break;
    default:
        console.log("option not validated");
        break;
    }
}

$(".restart").on("click", function () {
    $("h1").text("Level "+level);
    $("h2").text("Simon");
    $("h2").css("font-size", "3rem");
    randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    window.setTimeout(function(){
        blink(gamePattern[0]);
        playSound(gamePattern[0]);
    },1000);

        window.setTimeout(() => {
               ableButtons();
            }, 2000);
      

    $(".small-box").hide();
});

$(".btn").on("click", function () {
    userClickedPattern.push(this.classList[1]);
    playSound(this.classList[1]);
    if(userClickedPattern[clicks] === gamePattern[clicks]){
        if(userClickedPattern.length === gamePattern.length){
            victory();
        }
        clicks++;
    }else{
        debugger
        gamePattern = [];
        userClickedPattern = [];
        clicks = 0;
        level = 1;
        lose();
    }
});



