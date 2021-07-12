var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;

    $("#level-title").text("Level " + level);
}

$(".cbtn").on("click", handler);

function handler() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

var level = 0;

var started = false;

// $(document).on("keypress", function () {

//     if (!started) {
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//     }
// });

var starting = document.getElementById("start");
starting.addEventListener("click", function(){
    $(".Start__button").css("display", "none");
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, Refresh to Restart. Score = "+level);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []
    started = false;
}
