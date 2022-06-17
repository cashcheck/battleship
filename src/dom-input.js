/* eslint-disable eqeqeq */
import { ship, ship2, gameBoard } from './game-logic.js';
import { initGame } from './dom-game.js';

function addCoordinates(gb) {
  gb.shipsC.forEach((coordinate) => {
    const x = coordinate[0];
    const y = coordinate[1];

    const cell = document.querySelector(`[x='${x}'][y='${y}']`);

    cell.classList.add('active');
  });
}

// add all adjacent coordinates from gameBoard
function addAdjacent(gb) {
  gb.adjacent.forEach((coordinate) => {
    const x = coordinate[0];
    const y = coordinate[1];

    // check if in range
    if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
      const cell = document.querySelector(`[x='${x}'][y='${y}']`);

      cell.classList.add('adjacent');
    }
  });
}

// add all ships from gameBoard
function addShips(gb) {
  gb.ships.forEach((s) => {
    s.hitPoints.sort();
    const x = s.hitPoints[0][0];
    const y = s.hitPoints[0][1];
    const length = s.length * 30;
    const { orientation } = s;

    const cell = document.querySelector(`[x='${x}'][y='${y}']`);
    const dragDiv = document.createElement('div');
    dragDiv.classList.add('drag');
    dragDiv.setAttribute('draggable', 'true');
    dragDiv.setAttribute('orientation', `${s.orientation}`);
    dragDiv.setAttribute('length', `${s.length}`);

    if (orientation == 0) {
      dragDiv.style.width = `${length}px`;
      dragDiv.style.height = '28px';
    } else {
      dragDiv.style.height = `${length}px`;
      dragDiv.style.width = '28px';
    }

    cell.appendChild(dragDiv);
  });
}

function removeShipDOM(s) {
  s.adjacent.forEach((coordinate) => {
    const x = coordinate[0];
    const y = coordinate[1];

    // check if in range
    if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
      const cell = document.querySelector(`[x='${x}'][y='${y}']`);

      cell.classList.remove('adjacent');
    }
  });

  s.hitPoints.forEach((coordinate) => {
    const x = coordinate[0];
    const y = coordinate[1];

    const cell = document.querySelector(`[x='${x}'][y='${y}']`);

    cell.classList.remove('active');
  });
}

function addShipDOM(s) {
  s.adjacent.forEach((coordinate) => {
    const x = coordinate[0];
    const y = coordinate[1];

    // check if in range
    if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
      const cell = document.querySelector(`[x='${x}'][y='${y}']`);

      cell.classList.add('adjacent');
    }
  });

  s.hitPoints.forEach((coordinate) => {
    const x = coordinate[0];
    const y = coordinate[1];

    const cell = document.querySelector(`[x='${x}'][y='${y}']`);

    cell.classList.add('active');
  });
}

// add event listeners for drag functionality
function drag(gb) {
  let dragged = null;
  let rShip = null;

  document.addEventListener('dragstart', (e) => {
    dragged = e.target;
    const x = parseInt(dragged.parentNode.getAttribute('x'), 10);
    const y = parseInt(dragged.parentNode.getAttribute('y'), 10);
    rShip = gb.removeShip([x, y]);
    removeShipDOM(rShip);
    addAdjacent(gb);
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();

    let newCell = e.target;
    if (newCell.className == 'drag') {
      newCell = newCell.parentNode;
    }

    const x = parseInt(newCell.getAttribute('x'), 10);
    const y = parseInt(newCell.getAttribute('y'), 10);
    const l = parseInt(dragged.getAttribute('length'), 10);
    const o = parseInt(dragged.getAttribute('orientation'), 10);

    const newShip = ship2([x, y], l, o);

    if (gb.placeValidShip(newShip)) {
      dragged.parentNode.removeChild(dragged);
      newCell.appendChild(dragged);
      addShipDOM(newShip);
    } else {
      addShipDOM(rShip);
      gb.placeValidShip(rShip);
    }
  });
}

// add event listeners for rotate functionality
function rotate(gb) {
  const ships = document.querySelectorAll('.drag');
  ships.forEach((s) => {
    s.addEventListener('click', (e) => {
      // getting parameters for ship

      const dragDiv = e.target;
      const x = parseInt(dragDiv.parentNode.getAttribute('x'), 10);
      const y = parseInt(dragDiv.parentNode.getAttribute('y'), 10);
      const l = parseInt(dragDiv.getAttribute('length'), 10);
      const o = parseInt(dragDiv.getAttribute('orientation'), 10);

      const currentShip = ship2([x, y], l, o);
      const newShip = currentShip.rotate();
      gb.removeShip([x, y]);

      // if new ship is a valid placement
      if (gb.placeValidShip(newShip)) {
        removeShipDOM(currentShip);
        addShipDOM(newShip);
        dragDiv.setAttribute('orientation', `${newShip.orientation}`);
        if (newShip.orientation == 0) {
          dragDiv.style.width = `${30 * newShip.length}px`;
          dragDiv.style.height = '28px';
        } else {
          dragDiv.style.height = `${30 * newShip.length}px`;
          dragDiv.style.width = '28px';
        }
      } else {
        gb.placeValidShip(currentShip);
      }
    });
  });
}

function initInput(gb) {
  addCoordinates(gb);
  addAdjacent(gb);
  addShips(gb);
  drag(gb);
  rotate(gb);
}

export { initInput };
