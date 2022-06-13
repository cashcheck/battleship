import {ship, gameBoard, AI} from './game-logic.js';
import {initInput, drag} from './dom.js';
import './style.css';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const gameBoard1 = gameBoard();

gameBoard1.nRandomShips(1,4)
gameBoard1.nRandomShips(2,3)
gameBoard1.nRandomShips(3,2)
gameBoard1.nRandomShips(4,1)

initInput(gameBoard1)

console.log(gameBoard1);