
let buttonColors = ["red", "green", "blue", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(evt) {
    let userChosenColour = $(this).attr("id");
    playSound("sounds/"+userChosenColour+".mp3");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
});

function checkAnswer(num) {
  if (userClickedPattern[num] !== gamePattern[num]) {
    gameOver();
  } else if (userClickedPattern.length == gamePattern.length) {
    setTimeout(function () {
      nextSequence();

    }, 1000);
  }
}

function nextSequence() {
  let randomNumber = Math.floor(4 * Math.random());
  let randomChosenColour = buttonColors[randomNumber];
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound("sounds/"+randomChosenColour+".mp3");
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
  userClickedPattern = [];
  // console.log(gamePattern);
}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
  $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function gameOver () {
  playSound("sounds/wrong.mp3");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
  $("body").removeClass("game-over");
  }, 1000);
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
// $(document).on('click', function(evt) {
//   let target = $(evt.target); //create the element object to wwork with
//   if (target.hasClass("btn")) {
//     let userChosenColour = target.attr("id");
//     userClickedPattern.push(userChosenColour);
//     console.log(userClickedPattern)
//   }
// });
