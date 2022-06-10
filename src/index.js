import {ship, gameBoard, AI} from './game-logic.js';
import {init, drag} from './dom.js';
import './style.css';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let cells = document.querySelectorAll('.cell-content');

cells.forEach(cell => {

    cell.addEventListener('click', (e) => {

        console.log([cell.getAttribute('x'), cell.getAttribute('y')])

    })

})

const gameBoard1 = gameBoard();

gameBoard1.nRandomShips(2,4)
gameBoard1.nRandomShips(3,3)

init(gameBoard1)
drag();

console.log(gameBoard1);