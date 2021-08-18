import './style.css';
import { Colours } from './models/colours.enum';
import { Player } from './models/Player';
import { CurrentPlayer } from './models/CurrentPlayer';

function init() {
  addColours();
  ShowCurrentPlayer();
}

const Player1Colour: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('player1-slt')
);
const Player2Colour: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('player2-slt')
);

function addColours() {
  let count = 0;
  for (let c in Colours) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      Player1Colour.add(newOption);
    }
  }
  count = 0;
  for (let c in Colours) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      Player2Colour.add(newOption);
    }
  }
}

const P1: Player = new Player('PlayerOne');
const P2: Player = new Player('PlayerTwo');
const CURRENTPlayer: CurrentPlayer = new CurrentPlayer(P1, P2);
const CURRENTName = document.getElementById('currentPlayerName');

const ScoreOutput_P1: HTMLElement = document.getElementById('P1-Score');
const ScoreOutput_P2: HTMLElement = document.getElementById('P2-Score');

const Rolls_P1: HTMLElement = document.getElementById('P1-Rolls');
const Rolls_P2: HTMLElement = document.getElementById('P2-Rolls');

const ClickRollDiceBtn: HTMLElement = document.getElementById('RollDice-btn');
const ShowWInner: HTMLElement = document.getElementById('winner');

ClickRollDiceBtn.addEventListener('click', ShowRandomNumber);

function ShowCurrentPlayer() {
  CURRENTName.innerHTML = CURRENTPlayer.currentPlayer.name;
}

function ShowCurrentScore() {
  // Show Total Score
  ScoreOutput_P1.innerHTML = CURRENTPlayer.P1.total;
  ScoreOutput_P2.innerHTML = CURRENTPlayer.P2.total;

  // Show Individual Dice Rolls (P1)
  let P1_results: string = '';
  let P1_bg = Player1Colour[Player1Colour.value].text;

  for (let c in CURRENTPlayer.P1.results) {
    P1_results +=
      '<span style="border:1px solid black;margin:3px;padding:10px;background:' +
      P1_bg +
      '">' +
      CURRENTPlayer.P1.results[c] +
      '</span>';
  }

  Rolls_P1.innerHTML = P1_results;

  // Show Individual Dice Rolls (P2)
  let P2_results: string = '';
  let P2_bg = Player2Colour[Player2Colour.value].text;

  for (let c in CURRENTPlayer.P2.results) {
    P2_results +=
      '<span style="border:1px solid black;margin:3px;padding:10px;background:' +
      P2_bg +
      '">' +
      CURRENTPlayer.P2.results[c] +
      '</span>';
  }

  Rolls_P2.innerHTML = P2_results;
}

function ShowRandomNumber() {
  if (isGameOver()) {
    alert('Game Over');
  } else {
    let Dicenumber = [];
    Dicenumber = [1, 2, 3, 4, 5, 6];

    let randDicePosition = Math.floor(Math.random() * Dicenumber.length);
    let randNumber = Dicenumber[randDicePosition];

    CURRENTPlayer.currentPlayer.addResult(randNumber);
    CURRENTPlayer.switchPlayer();
    ShowCurrentPlayer();
    ShowCurrentScore();
  }
}

function isGameOver() {
  let r: boolean = false;

  if (CURRENTPlayer.P1.total >= 20) {
    ShowWInner.innerHTML = CURRENTPlayer.P1.name;
    r = true;
  } else if (CURRENTPlayer.P2.total >= 20) {
    ShowWInner.innerHTML = CURRENTPlayer.P2.name;
    r = true;
  }

  return r;
}

init();
