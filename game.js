const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var level = 0;
var started = false


const playSound = (name) => {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
};

const animatePress = (currentColour) => {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};


const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      },1000)
    }
  } 
  else{
    $('body').addClass('game-over');
    setTimeout(() => {
      
      $('body').removeClass('game-over');
    }, 200);
    
    $("h1").text("Game Over, Press any key to restart"); 
    startOver();
  }

}

const nextSequence = () => {
  userClickedPattern.length = 0
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  animatePress(randomChosenColour)
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level); 
};

  $("body").keydown(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }})


$(".btn").on("click", function (e) {
  let userChosenColour = e.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //nextSequence()
  checkAnswer(userClickedPattern.length-1)
  console.log(userClickedPattern);
  console.log(gamePattern);
});

const  startOver = ()  => {

  level = 0;
  gamePattern.length = 0;
  started = false;
}
