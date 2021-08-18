import { Player } from './Player.ts';

export class CurrentPlayer {
  P1: Player;
  P2: Player;
  currentPlayer: Player;

  constructor(player1: Player, player2: Player) {
    this.P1 = player1;
    this.P2 = player2;
    this.currentPlayer = player1; // References current Player object
  }

  switchPlayer() {
    if (this.currentPlayer.name == this.P1.name) {
      this.currentPlayer = this.P2;
    } else {
      this.currentPlayer = this.P1;
    }
  }
}