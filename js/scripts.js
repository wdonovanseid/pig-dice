// Specifications //

// ROLL DICE FUNCTION - the dice object is rolled, and a number from 1 through 6 is output randomly each time.//

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// END TURN FUNCTION - ends players turn and swaps to other player. //

function endTurn (playerId) {
  if (playerId == 0) {
    playerId = 1;
    $("body").removeClass("background-blue")
    $("body").addClass("background-red");
  } else {
    playerId = 0;
    $("body").removeClass("background-red")
    $("body").addClass("background-blue");
  }
  return playerId;
}

// GO FIRST FUNCTION //
// Outputs at random either a zero or one. If it is zero, player one goes first, if 1 player two goes first//

function goFirst() {
  let asdf = Math.floor(Math.random() * 2 );
  if (asdf == 0) {
    playerGroup.players[0].playerTurn = true;
    $("body").addClass("background-blue");
    return 0;
  } else {
    playerGroup.players[1].playerTurn = true;
    $("body").addClass("background-red")
    return 1;
  }
}

// GROUP OF PLAYERS CONSTRUCTOR - will hold the players. //

function GroupOfPlayers() {
  this.players = [];
  this.currentId = 0;
}

GroupOfPlayers.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players.push(player);
}

GroupOfPlayers.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

GroupOfPlayers.prototype.findPlayer = function(id) {
  for (let i=0; i< this.players.length; i++) {
    if (this.players[i]) {
      if (this.players[i].id == id + 1) {
        return this.players [i];
      }
    }
  };
  return false;
}

// TURN TOTAL FUNCTION - the dice object outputs a number, if that number is 2 through 6 it is added to the players turn total. If the dice output is 1, the turn total is 0, and next player turn // 

GroupOfPlayers.prototype.turnTotal = function(id, roll) {
  if (roll == 1) {
    this.players[id].turnTotal = 0;
    return this.players[id].turnTotal;
  } else {
    this.players[id].turnTotal = this.players[id].turnTotal + roll;
    return this.players[id].turnTotal;
  }
}

// HOLD FUNCTION - if hold function is True, the players turn total is added to their score, and it is the next players turn. //

GroupOfPlayers.prototype.hold = function(id) {
  this.players[id].totalScore = this.players[id].totalScore + this.players[id].turnTotal;
}

// PLAYER CONSTRUCTOR - will hold the players score and if it is their turn. //

function Player() {
  this.turnTotal = 0;
  this.totalScore = 0;
  this.playerTurn = false;
}

// DISPLAY FUNCTION //

function display(playerGroupToDisplay) {
  let asdf1 = $("#turn-total");
  let asdf2 = $("#total-score");
  let htmlForPlayerTurnTotal = "";
  let htmlForPlayerScoreTotal = "";
  playerGroupToDisplay.players.forEach(function(player) {
    htmlForPlayerTurnTotal += "<p id=" + player.id + ">Player " + player.id + " Turn Total: " + player.turnTotal + "</p>";
    htmlForPlayerScoreTotal += "<p id=" + player.id + ">Player " + player.id + " Total Score: " + player.totalScore + "</p>";
  })
  asdf1.html(htmlForPlayerTurnTotal);
  asdf2.html(htmlForPlayerScoreTotal);
}

// SHOW PLAYER FUNCTION //

function showPlayer(playerId) {
  const player = playerGroup.findPlayer(playerId);
  $("#turn-total").html(player.turnTotal);
  $("#total-score").html(player.totalScore);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='rollDice' id=" + player.id + ">Roll!</button>");
  buttons.append("<button class='hold' id=" + player.id + ">Hold!</button>");
}

// ATTACH LISTENERS FUNCTION //

function attachListeners() {
  let playerId;
  $("button#goFirst").on("click", function() {
    playerId = goFirst();
    $("button#goFirst").hide();
    showPlayer(playerId)
    display(playerGroup);
  });
  $("#buttons").on("click", ".rollDice", function () {
    let roll = rollDice();
    $("#dice-roll").text(roll);
    let check = playerGroup.turnTotal(playerId, roll);
    if (check == 0) {
      playerId = endTurn(playerId);
    }
    display(playerGroup);
  });
  $("#buttons").on("click", ".hold", function() {
    playerGroup.hold(playerId);
    let player = playerGroup.findPlayer(playerId)
    if (player.totalScore >= 100) {
      alert("player one")
      $("#buttons").hide();
    }
    playerId = endTurn(playerId);
    display(playerGroup);
  });
}

let playerGroup = new GroupOfPlayers();

// USER INTERFACE LOGIC //

$(document).ready(function() {
  attachListeners();

  let playerOne = new Player();
  let playerTwo = new Player();
  playerGroup.addPlayer(playerOne);
  playerGroup.addPlayer(playerTwo);
});