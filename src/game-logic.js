
//helper functions
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getCoordinates(xmax,ymax) {
    const x = getRandomInt(xmax);
    const y = getRandomInt(ymax)
    
    return [x,y];
}

//ship object initialized with 2 input arrays containing containing coordinates. 
function ship(c1, c2) {

    let hits = []
    //calculates the length by subtracting the x and y coordinates and adding 1
    const length = Math.abs(c1[0] - c2[0] + c1[1] - c2[1]) + 1;

    //given two coordinates, returns all coordinates in between
    function getHitPoints(c1, c2) {
    
        const HP = []

        //if length 1 then just return the only coordinate
        if (length == 1) {
            return [c1]
        }

        //if x values are the same then return coordinates with same x value and all y values in between
        if (c1[0] == c2[0]) {

            if (c1[1] > c2[1]) {
                for (let i = c2[1]; i <= c1[1]; i++) {
                    HP.push([c1[0], i]);
                }
            }

            else {
                for (let i = c1[1]; i <= c2[1]; i++) {
                    HP.push([c1[0], i]);
                }
            }
        }

        //if y values are the same then return coordinates with same y value and all x values in between
        else {
            if (c1[0] > c2[0]) {
                for (let i = c2[0]; i <= c1[0]; i++) {
                    HP.push([i, c1[1]]);
                }
            }

            else {
                for (let i = c1[0]; i <= c2[0]; i++) {
                    HP.push([i, c1[1]]);
                }
            }
        }
    
        return HP;

    }

    let hitPoints = getHitPoints(c1,c2);

    //checks to see if coordinates hit, returns [true/false, coordinate]
    function hit(c) {
        const cString = c.toString()
        for (let i = 0; i < hitPoints.length; i++) {
            if (hitPoints[i].toString() == cString) {
                hits.push(c);
                return true;
            }
        }
        return false;
    } 

    function isSunk() {
        if (hits.length == length) {
            return true;
        }
        return false;
    }

    return {
        length: length,
        hitPoints: hitPoints,
        hits: hits,
        isSunk,
        hit,
    };

}

//gameboard factory function
//places ships are certain coordinates
//receivesAttacks function which takes a coordinate and either hits the ship at said coordinate or records missed attack
//reports whether or not all ships have been sunk

function gameBoard() {

    let ships = [];
    let shipsC = []
    let misses = [];
    let hits = [];

    //takes a length and direction (0 - vertical, 1 - horizontal) and generates a random ship
    function randomShip(length, direction) {
        
        if (direction == 0) {
            const c1 = getCoordinates(9 - length, 9);
            const c2 = [];
            c2.push(c1[0]+length-1);
            c2.push(c1[1]);
            return ship(c1,c2);
        }

        const c1 = getCoordinates(9, 9 - length);
        const c2 = [];
        c2.push(c1[0]);
        c2.push(c1[1]+length-1);
        return ship(c1,c2);
    }

    //checks if ship coordinates already in the Board. 
    function checkShip(ship) {

        for (let i = 0; i < ship.length; i++) {

            if (shipsC.some( c => c.toString() == ship.hitPoints[i].toString())) {
                return false;
            }

        }

        return true;

    }

    //adds ship to ships array
    function placeShip(ship) {
        
        ship.hitPoints.forEach(coordinate => {
            shipsC.push(coordinate);
        })
        
        ships.push(ship);
    }

    //checks to see if ship is valid before placing
    function placeValidShip(ship) {
        if (checkShip(ship)) {
            placeShip(ship);
        }
    }

    function nRandomShips(n, shipLength) {

        const newLength = ships.length + n;

        while (ships.length < newLength) {
            let ship1 = randomShip(shipLength, getRandomInt(2));
            placeValidShip(ship1);
        }

    }

    //calls ship.hit() for all ships and updates hits or misses
    function receiveAttack(c) {

        for (let i = 0; i < ships.length; i++) {

            if (ships[i].hit(c)) {
                hits.push(c);
                return

            }
        }
        misses.push(c);
    }

    //checks to see if all ships are sunk
    function sunkAll() {
        if (hits.length == shipsC.length) {
            return true;
        }
        else {
            return false;
        }
    }

    return {ships: ships, 
            shipsC: shipsC,
            hits: hits,
            misses: misses,
            placeShip,
            checkShip,
            placeValidShip,
            randomShip,
            nRandomShips,
            sunkAll,
            receiveAttack,
    };

}

function AI() {

    const board = gameBoard()

    function populateBoard() {
    }

    function play() {
        return getCoordinates(9,9);
    }

    return {
            play,
            board: board,
    }

}

//gameplay loop
function game(p1Board, p2Board) {

    while (p1Board.sunkAll() && p2Board.sunkAll()) {
        p1.play
        p2.play
    }

}




export {ship, gameBoard, AI};

