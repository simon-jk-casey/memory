$(document).ready(function(){
  //array of cells
  var cellId = $(".cell").toArray();
  var memoryCells = [];
  var clickedCells = [];
  //round ~ message
  var messageDiv = $(".message");
  var round = 1;
  var level = round-1;

  //START GAME
  $(".cell").css("pointer-events", "none");
  $("#startButton").click(function(){
    gameRounds(round);
    round++
  })

  //GAME ROUNDS
  function gameRounds(round){
    resetBoard();
    for (var i=0; i<round+1; i++) {
      memoryCells = cellId.slice(0,[i])
    }
    memoryFlash(memoryCells)
  }

  //FLASH SYMBOLS TO REMEMBER
  function memoryFlash(array) {
    $(".cell").css("pointer-events", "none");
    var i=0;
    var flashInterval = window.setInterval(function(){
      $(array[i]).addClass('selected');
      i++;
      if (i > array.length){
        clearInterval(flashInterval);
        flashOff(memoryCells)
      }
    }, 1000)
  }
  function flashOff(array){
    var i=0;
    var flashInterval = window.setInterval(function(){
      $(array[i]).removeClass('selected');
      i++;
      if (i > array.length){
        var level = i-1
        clearInterval(flashInterval);
        $(".cell").css("pointer-events", "auto")
        messageDiv.text("Level " + level + " --- GO!")
      }
    }, 1)
  }

  //GAME PLAY
  $(".cell").click(function(){
    clickedCells.push(this);
      for (var i=0; i<clickedCells.length; i++){
        if (clickedCells[i] === memoryCells[i]) {
          $(memoryCells[i]).addClass("selected");
          $(clickedCells[i]).addClass("selected");
          levelComplete();
        }
        if (clickedCells[i]!==memoryCells[i]) {
          $(clickedCells[i]).addClass("wrong");
          $(".cell a").click(false);
          var loseAud = document.getElementById("gameOver")
          loseAud.play()
          resetBoard();
          var failLevel = round-1
          messageDiv.text("Game Over. You reached Level " + failLevel + ".")
          $("#startButton").text("Try Again").click(function(){
            location.reload();
          })
        }
      }
  })

  //CHECK FOR LEVEL COMPLETION
  function levelComplete(){
    if (clickedCells.length !== 0) {
      if (clickedCells.length === memoryCells.length){
        messageDiv.text("Level " + clickedCells.length + " complete!");
        $(".cell").css("pointer-events", "none");
        $("#startButton").text("Level " + round)
        if (clickedCells.length === 16) {
          messageDiv.text("GAME COMPLETE - AWESOME MEMORY!")
          var clockAud = document.getElementById("clocked");
          clockAud.play();
          $("#startButton").text("Restart").click(function(){
            location.reload();
          })
        };
      }
    }
  }

  //RESET BOARD
  function resetBoard(){
    clickedCells = [];
    memoryCells = [];
    shuffleArray(cellId);
    $(".cell").removeClass("selected")
  }

  //SHUFFLE ARRAY //DURSTENFELD SHUFFLE
  function shuffleArray(array) {
    for (var i=array.length-1; i>0; i--){
      var j = Math.floor(Math.random() * (i+1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    };
    return array;
  }
});
