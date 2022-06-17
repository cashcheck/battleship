/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import {
  AI, player,
} from './game-logic.js';

// adds the coordinatets of ships
function addCoordinatesAI(gb) {
  gb.shipsC.forEach((coordinate) => {
    const x = coordinate[0];
    const y = coordinate[1];

    const aiContainer = document.querySelector('#ai-container');

    const cell = aiContainer.querySelector(`[x='${x}'][y='${y}']`);

    cell.classList.add('contains-ship');
  });
}

// checks to see if ship is sunk and if so sinks adjacent squares
function checkSunk(attackedShip) {
  if (attackedShip.isSunk()) {
    const aiContainer = document.querySelector('#ai-container');

    attackedShip.adjacent.forEach((c) => {
      const x = c[0];
      const y = c[1];

      if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
        const cell = aiContainer.querySelector(`[x='${x}'][y='${y}']`);
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);

        newCell.classList.add('attacked');
      }
    });
  }
}

function toggleBlocker() {
  const blocker = document.querySelector('#blocker');
  const active = blocker.getAttribute('active');
  console.log(active);
  if (active == '0') {
    blocker.style.zIndex = '10';
    blocker.setAttribute('active', '1');
  } else {
    blocker.setAttribute('active', '0');
    blocker.style.zIndex = '-1';
  }
}

// adds event listeners for ships to be attacked
function enableAttacks(gb, ai) {
  const aiCells = document.querySelectorAll('.ai-cell');

  aiCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const x = parseInt(cell.getAttribute('x'), 10);
      const y = parseInt(cell.getAttribute('y'), 10);
      const coordinate = [x, y];

      const hit = gb.receiveAttack(coordinate);
      cell.classList.add('attacked');

      if (cell.classList == 'ai-cell contains-ship attacked') {
        const attackedShip = gb.findShip(coordinate);
        checkSunk(attackedShip);
      } else {
        toggleBlocker();
        ai.AITurn();
      }
    }, { once: true });
  });
}

// checks to see if players ships are sunk and sinks adjacent squares
function checkSunkPlayer(attackedShip) {
  if (attackedShip.isSunk()) {
    const playerContainer = document.querySelector('#player-container');

    attackedShip.adjacent.forEach((c) => {
      const x = c[0];
      const y = c[1];

      if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
        const cell = playerContainer.querySelector(`[x='${x}'][y='${y}']`);
        cell.classList.add('attacked');
      }
    });
  }
}

function AIAttack(c, board) {
  const x = c[0];
  const y = c[1];

  const attackedDiv = document.querySelector(`[x='${x}'][y='${y}']`);
  attackedDiv.classList.add('attacked');
  const attackedShip = board.findShip(c);
  if (attackedShip) {
    checkSunkPlayer(attackedShip);
  }
}

function enableAIDisplay() {
  const aiDiv = document.querySelector('#ai-container');

  aiDiv.style.display = 'block';
}

function disableSelection() {
  const selectionDiv = document.querySelector('#selection');

  selectionDiv.style.display = 'none';
}

function playerDisplay() {
  const ships = document.querySelectorAll('.drag');
  ships.forEach((s) => {
    s.remove();
  });
  const cells = document.querySelectorAll('.cell-content');
  cells.forEach((c) => {
    c.style.backgroundColor = 'white';
  });
}

function displayChange() {
  enableAIDisplay();
  disableSelection();
  playerDisplay();
}

async function initGame(playerBoard, AIBoard) {
  displayChange();
  addCoordinatesAI(AIBoard);

  const p = player(playerBoard, AIBoard);
  const ai = AI(playerBoard, AIBoard);
  enableAttacks(AIBoard, ai);
}
// event listener on start button
function start(playerBoard, AIBoard) {
  const submitButton = document.querySelector('#start');

  submitButton.addEventListener('click', () => {
    initGame(playerBoard, AIBoard);
  });
}

export {
  start, toggleBlocker, AIAttack,
};
