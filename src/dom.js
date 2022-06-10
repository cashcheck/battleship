import {ship, gameBoard, AI} from './game-logic.js';

let cells = document.querySelectorAll('.cell-content');

cells.forEach(cell => {

    cell.addEventListener('click', (e) => {

        console.log([cell.getAttribute('x'), cell.getAttribute('y')])

    })

})


//adds random ships to gameBoard
const gameBoard1 = gameBoard();

while (gameBoard1.ships.length < 2) {
    let ship1 = gameBoard1.randomShip(4, 0);
    gameBoard1.placeValidShip(ship1);
}


function init(gb) {

    gb.shipsC.forEach(coordinate => {

        let x = coordinate[0];
        let y = coordinate[1];
        
        const div = document.querySelector(`[x='${x}'][y='${y}']`);
        
        div.classList.add('active');
        
        })

}

function drag() {

let dragged = null;

document.addEventListener('dragstart', (e) => {
    
    dragged = e.target;

})

document.addEventListener("dragover", event => {
   
    event.preventDefault();
    
  });

document.addEventListener('drop', (e) => {

    e.preventDefault();

    if (e.target.className == 'cell-content') {
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
    }

})

}

export {init, drag}



