import GroupOfPlayers from './../src/group-logic.js';
import Player from './../src/player-logic.js';

describe('GroupOfPlayers', () => {

  test('should add Player to group of players', () => {
    const group = new GroupOfPlayers();
    const player = new Player();
    group.addPlayer(player);
    expect(group.players).toContain(player);
  });
  test('should assign ID to new Player in group', () => {
    const group = new GroupOfPlayers();
    const player = new Player();
    group.addPlayer(player);
    expect(group.players[0].id).toEqual(player.id);
  });

  test('should find player in group of players', () => {
    const group = new GroupOfPlayers();
    const player = new Player();
    group.addPlayer(player);
    expect(group.findPlayer(0)).toEqual(group.players[0]);
  });

  test('should not find player if no player in group', () => {
    const group = new GroupOfPlayers();
    const player = new Player();
    group.addPlayer(player);
    expect(group.findPlayer(1234)).toEqual(false);
  });

  test('should add number to player turn total if number is 2 through 6', () => {
    const group = new GroupOfPlayers();
    const player = new Player();
    group.addPlayer(player);
    expect(group.turnTotal(0,3)).toEqual(3)
  });

  test('should make player turn total 0 if roll is 1', () => {
    const group = new GroupOfPlayers();
    const player = new Player();
    group.addPlayer(player);
    expect(group.turnTotal(0,1)).toEqual(0)
  });

  test('should add turnTotal to totalScore', () => {
    const group = new GroupOfPlayers();
    const player = new Player();
    group.addPlayer(player);
    player.turnTotal = 13;
    group.hold(0);
    expect(player.totalScore).toEqual(13);
  });
});