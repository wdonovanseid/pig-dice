import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GroupOfPlayers from './group-logic.js';
import Player from './player-logic.js';

// ROLL DICE FUNCTION - the dice object is rolled, and a number from 1 through 6 is output randomly each time.//

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// END TURN FUNCTION - ends players turn and swaps to other player. //

function endTurn (playerId) {
  if (playerId == 0) {
    playerId = 1;
    $("h2#player1").hide();
    $("h2#player2").show();
    $("body").removeClass("background-blue");
    $("body").addClass("background-red");
  } else {
    playerId = 0;
    $("h2#player2").hide();
    $("h2#player1").show();
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
    $("h2#player1").show();
    $("body").addClass("background-blue");
    return 0;
  } else {
    $("h2#player2").show();
    $("body").addClass("background-red")
    return 1;
  }
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

// ATTACH LISTENERS FUNCTION //

function attachListeners() {
  let playerId;
  $("button#goFirst").on("click", function() {
    playerId = goFirst();
    $("#buttons").show()
    $("button#goFirst").hide();
    display(playerGroup);
  });
  $("button#rollDice").on("click", function () {
    let roll = rollDice();
    $("#dice-roll").text(roll);
    let check = playerGroup.turnTotal(playerId, roll);
    if (check == 0) {
      playerId = endTurn(playerId);
    }
    display(playerGroup);
  });
  $("button#hold").on("click", function() {
    playerGroup.hold(playerId);
    let player = playerGroup.findPlayer(playerId)
    display(playerGroup);
    if (player.totalScore >= 100) {
      $("#victory").show();
      $(".playerId").text(playerId + 1);
      $("#buttons").hide();
    } else {
      playerId = endTurn(playerId);
    }
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