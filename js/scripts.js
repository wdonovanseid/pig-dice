// Specifications //

// ROLL DICE FUNCTION - the dice object is rolled, and a number from 1 through 6 is output randomly each time.//

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// TURN TOTAL FUNCTION - the dice object outputs a number, if that number is 2 through 6 it is added to the players turn total. If the dice output is 1, the turn total is 0, and next player turn // 

function turnTotal() {
  let temp = rollDice();
  let tTotal;
  if (temp == 1) {
    tTotal = 0;
    endTurn();
  } else {
    tTotal = tTotal + temp;
  }
  return tTotal;
}

// HOLD FUNCTION - if hold function is True, the players turn total is added to their score, and it is the next players turn. //

function hold(player, turnTotal) {
  player.totalScore = player.totalScore+turnTotal;
  endTurn();
}

// VICTORY FUNCTION - takes a players score as input, if the score is >= 100, output is win! and game = over. //

function victory(totalScore) {
  if (totalScore >= 100) {
    return "You have won!!"
  }
}

// END TURN FUNCTION - ends players turn and swaps to other player. //

function endTurn (player, nextPlayer) {
  player.playerTurn = false;
  nextPlayer.playerTurn = true;
}

// PLAYER OBJECTS - two players objects, each will hold the players score and if it is their turn. //

let playerOne = {
  totalScore: 0;
  playerTurn: false
}

let playerTwo = {
  totalScore: 0;
  playerTurn: false
}



// TURN FUNCTION - If playerTurn key is true then it is that players turn. //

// GO FIRST FUNCTION //
// Outputs at random either a zero or one. If it is zero, player one goes first, if 1 player two goes first//

function goFirst() {
  let asdf = Math.floor(Math.random() * 2 );
  if (asdf == 0) {
    playerOne.playerTurn = true;
  } else {
    playerTwo.playerTurn = true;
  }
}