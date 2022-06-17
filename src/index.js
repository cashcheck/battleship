/* eslint-disable import/extensions */
import { ship, gameBoard } from './game-logic.js';
import { initInput } from './dom-input.js';
import { start } from './dom-game.js';
import './style.css';

const gameBoard1 = gameBoard();

gameBoard1.nRandomShips(1, 4);
gameBoard1.nRandomShips(2, 3);
gameBoard1.nRandomShips(3, 2);
gameBoard1.nRandomShips(4, 1);

const gameBoard2 = gameBoard();

gameBoard2.nRandomShips(1, 4);
gameBoard2.nRandomShips(2, 3);
gameBoard2.nRandomShips(3, 2);
gameBoard2.nRandomShips(4, 1);

initInput(gameBoard1);
start(gameBoard1, gameBoard2);
