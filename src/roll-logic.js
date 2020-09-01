// ROLL DICE FUNCTION - the dice object is rolled, and a number from 1 through 6 is output randomly each time.//

export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
