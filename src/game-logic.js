import { toggleBlocker, AIAttack } from './dom-game.js';

/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
// helper functions
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getCoordinates(xmax, ymax) {
  const x = getRandomInt(xmax);
  const y = getRandomInt(ymax);

  return [x, y];
}

// ship object initialized with 2 input arrays containing containing coordinates.
function ship(c1, c2) {
  const hits = [];
  // calculates the length by subtracting the x and y coordinates and adding 1
  const length = Math.abs(c1[0] - c2[0] + c1[1] - c2[1]) + 1;

  // given two coordinates, returns all coordinates in between
  function getHitPoints() {
    const HP = [];

    // if length 1 then just return the only coordinate
    if (length == 1) {
      return [c1];
    }

    // if x values are the same then return coordinates
    // with same x value and all y values in between
    if (c1[0] == c2[0]) {
      if (c1[1] > c2[1]) {
        for (let i = c2[1]; i <= c1[1]; i++) {
          HP.push([c1[0], i]);
        }
      } else {
        for (let i = c1[1]; i <= c2[1]; i++) {
          HP.push([c1[0], i]);
        }
      }
    }

    // if y values are the same then return coordinates
    // with same y value and all x values in between
    else if (c1[0] > c2[0]) {
      for (let i = c2[0]; i <= c1[0]; i++) {
        HP.push([i, c1[1]]);
      }
    } else {
      for (let i = c1[0]; i <= c2[0]; i++) {
        HP.push([i, c1[1]]);
      }
    }

    return HP;
  }

  const hitPoints = getHitPoints();

  // returns the orientation of the ship. Returns 0 for horizontal, 1 for vertical.
  function getOrientation() {
    if (length == 1) {
      return 1;
    }
    if (c1[0] == c2[0]) {
      return 1;
    }
    return 0;
  }

  const orientation = getOrientation();

  // function returns the coordinates which are adjacent to ship
  function getAdjacent() {
    hitPoints.sort();
    const start = hitPoints[0];
    const end = hitPoints[length - 1];
    const adjacencies = [];
    const ori = getOrientation();

    // if horizontal ship
    if (ori == 0) {
      // add coordinates to the left of start
      adjacencies.push([start[0] - 1, start[1]]);
      adjacencies.push([start[0] - 1, start[1] - 1]);
      adjacencies.push([start[0] - 1, start[1] + 1]);

      // add coordinates to right of end
      adjacencies.push([end[0] + 1, end[1]]);
      adjacencies.push([end[0] + 1, end[1] - 1]);
      adjacencies.push([end[0] + 1, end[1] + 1]);

      // add coordinates above and below each coordinate in hitPoints
      hitPoints.forEach((coordinate) => {
        adjacencies.push([coordinate[0], coordinate[1] + 1]);
        adjacencies.push([coordinate[0], coordinate[1] - 1]);
      });

      return adjacencies;
    }

    // if vertical ship

    // add coordinates above start
    adjacencies.push([start[0], start[1] - 1]);
    adjacencies.push([start[0] - 1, start[1] - 1]);
    adjacencies.push([start[0] + 1, start[1] - 1]);

    // add coordinates below end
    adjacencies.push([end[0], end[1] + 1]);
    adjacencies.push([end[0] - 1, end[1] + 1]);
    adjacencies.push([end[0] + 1, end[1] + 1]);

    hitPoints.forEach((coordinate) => {
      adjacencies.push([coordinate[0] + 1, coordinate[1]]);
      adjacencies.push([coordinate[0] - 1, coordinate[1]]);
    });

    return adjacencies;
  }

  const adjacent = getAdjacent();

  function rotate() {
    if (orientation == 0) {
      return ship2(c1, length, 1);
    }
    return ship2(c1, length, 0);
  }

  // checks to see if coordinates hit, returns [true/false, coordinate]
  function hit(c) {
    const cString = c.toString();
    for (let i = 0; i < hitPoints.length; i++) {
      if (hitPoints[i].toString() == cString) {
        hits.push(c);
        return true;
      }
    }
    return false;
  }

  function isSunk() {
    if (hits.length === length) {
      return true;
    }
    return false;
  }

  return {
    length,
    hitPoints,
    hits,
    adjacent,
    orientation,
    rotate,
    isSunk,
    hit,
  };
}

// ship object initialized with one coordinate, orientation and length
function ship2(c1, length, orientation) {
  const c2 = [];
  if (orientation == 0) {
    c2.push(c1[0] + length - 1);
    c2.push(c1[1]);
    return ship(c1, c2);
  }

  c2.push(c1[0]);
  c2.push(c1[1] + length - 1);
  return ship(c1, c2);
}

// gameboard factory function
function gameBoard() {
  const ships = [];
  const shipsC = [];
  const adjacent = [];
  const misses = [];
  const hits = [];

  // takes a length and direction (0 - vertical, 1 - horizontal) and generates a random ship
  function randomShip(length, direction) {
    if (direction == 0) {
      const c1 = getCoordinates(9 - length, 9);
      const c2 = [];
      c2.push(c1[0] + length - 1);
      c2.push(c1[1]);
      return ship(c1, c2);
    }

    const c1 = getCoordinates(9, 9 - length);
    const c2 = [];
    c2.push(c1[0]);
    c2.push(c1[1] + length - 1);
    return ship(c1, c2);
  }

  // checks if ship coordinates already in the Board or if coordinates out of bounds.
  function checkShip(ship) {
    for (let i = 0; i < ship.length; i++) {
      if (shipsC.some((c) => c.toString() == ship.hitPoints[i].toString())) {
        return false;
      }

      if (adjacent.some((c) => c.toString() == ship.hitPoints[i].toString())) {
        return false;
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const coordinate = ship.hitPoints[i];

      if (coordinate.some((c) => c < 0 || c > 9)) {
        return false;
      }
    }

    return true;
  }

  // adds ship to ships array
  function placeShip(ship) {
    ship.hitPoints.forEach((coordinate) => {
      shipsC.push(coordinate);
    });

    ship.adjacent.forEach((c) => {
      adjacent.push(c);
    });
    ships.push(ship);
  }

  // checks to see if ship is valid before placing. Returns true if valid, false if not.
  function placeValidShip(ship) {
    if (checkShip(ship)) {
      placeShip(ship);
      return true;
    }
    return false;
  }

  // given a coordinate find the corresponding ship
  function findShip(c) {
    return ships.find((s) => s.hitPoints.find((x) => x.toString() == c.toString()));
  }

  function findShipIndex(c) {
    return ships.findIndex((s) => s.hitPoints.find((x) => x.toString() == c.toString()));
  }

  function removeAdjacent(ship) {
    ship.adjacent.forEach((c) => {
      const i = adjacent.findIndex((coordinate) => coordinate.toString() == c.toString());
      adjacent.splice(i, 1);
    });
  }

  function removeShipC(ship) {
    ship.hitPoints.forEach((c) => {
      const i = shipsC.findIndex((coordinate) => coordinate.toString() == c.toString());
      shipsC.splice(i, 1);
    });
  }

  function removeShip(c) {
    const i = findShipIndex(c);
    const rShip = findShip(c);
    ships.splice(i, 1);
    removeAdjacent(rShip);
    removeShipC(rShip);

    return rShip;
  }

  function nRandomShips(n, shipLength) {
    const newLength = ships.length + n;

    while (ships.length < newLength) {
      const ship1 = randomShip(shipLength, getRandomInt(2));
      placeValidShip(ship1);
    }
  }

  // calls ship.hit() for all ships and updates hits or misses.
  // Also sinks adjacent squares if ship is sunk.
  function receiveAttack(c) {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].hit(c)) {
        hits.push(c);
        if (ships[i].isSunk()) {
          ships[i].adjacent.forEach((c) => {
            misses.push(c);
          });
        }
        return 1;
      }
    }
    misses.push(c);
    return 0;
  }

  // checks to see if all ships are sunk
  function sunkAll() {
    if (hits.length == shipsC.length) {
      return true;
    }
    return false;
  }

  return {
    ships,
    shipsC,
    hits,
    misses,
    adjacent,
    placeValidShip,
    findShip,
    findShipIndex,
    removeShip,
    nRandomShips,
    randomShip,
    sunkAll,
    receiveAttack,
  };
}

function AI(playerBoard, AIBoard) {
  const board = AIBoard;

  // determines whether or not attack is valid
  function validAttack(c) {
    const inHits = playerBoard.hits.some((coordinate) => coordinate.toString() == c.toString());
    const inMisses = playerBoard.misses.some((coordinate) => coordinate.toString() == c.toString());

    if (inHits || inMisses) {
      return false;
    }
    return true;
  }

  function attack() {
    let coordinate = getCoordinates(9, 9);

    while (!validAttack(coordinate)) {
      coordinate = getCoordinates(9, 9);
    }

    return coordinate;
  }

  async function AITurn() {
    let c = attack();
    let hit = playerBoard.receiveAttack(c);
    await new Promise((resolve) => setTimeout(resolve, 500));
    AIAttack(c, playerBoard);
    while (hit && (!board.sunkAll())) {
      console.log('infinite loop');
      c = attack();
      hit = playerBoard.receiveAttack(c);
      await new Promise((resolve) => setTimeout(resolve, 500));
      AIAttack(c, playerBoard);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    toggleBlocker();
  }

  return {
    board,
    attack,
    AITurn,
  };
}

function player(playerBoard, AIBoard) {
  const board = playerBoard;

  return {
    board,
  };
}

function game(player, ai) {
  while (!(player.board.sunkAll() || ai.board.sunkAll())) {
    player.playerTurn();
    ai.AITurn();
  }
  console.log('game over');
}

export {
  ship, ship2, gameBoard, AI, player, game,
};
