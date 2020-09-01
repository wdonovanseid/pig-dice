// GROUP OF PLAYERS CONSTRUCTOR - will hold the players. //

export default function GroupOfPlayers() {
  this.players = [];
  this.currentId = 0;
}

GroupOfPlayers.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players.push(player);
};

GroupOfPlayers.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

GroupOfPlayers.prototype.findPlayer = function(id) {
  for (let i=0; i< this.players.length; i++) {
    if (this.players[i].id == id + 1) {
      return this.players[i];
    }
  }
  return false;
};

// TURN TOTAL FUNCTION - the dice object outputs a number, if that number is 2 through 6 it is added to the players turn total. If the dice output is 1, the turn total is 0, and next player turn // 

GroupOfPlayers.prototype.turnTotal = function(id, roll) {
  if (roll == 1) {
    this.players[id].turnTotal = 0;
    return this.players[id].turnTotal;
  } else {
    this.players[id].turnTotal = this.players[id].turnTotal + roll;
    return this.players[id].turnTotal;
  }
};

// HOLD FUNCTION - if hold function is True, the players turn total is added to their score, and it is the next players turn. //

GroupOfPlayers.prototype.hold = function(id) {
  this.players[id].totalScore = this.players[id].totalScore + this.players[id].turnTotal;
  this.players[id].turnTotal = 0;
};