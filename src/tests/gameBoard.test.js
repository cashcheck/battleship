import {ship, gameBoard} from '../game-logic.js';

test('.receiveAttack() updates ship.hits', () => {

    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeShip(ship2);
    gameBoard1.receiveAttack([4,1]);

    expect(ship2.hits).toStrictEqual([[4,1]]);

})

test('.receiveAttack() updates .misses', () => {
    
    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeShip(ship2);
    gameBoard1.receiveAttack([5,1]);

    expect(gameBoard1.misses).toStrictEqual([[5,1]]);

})

test('.sunkAll() returns False correctly', () => {

    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeShip(ship2);
    gameBoard1.receiveAttack([4,1]);
    gameBoard1.receiveAttack([4,2]);

    expect(gameBoard1.sunkAll()).toBe(false);

})

test('.sunkAll() returns True correctly', () => {

    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeShip(ship2);
    gameBoard1.receiveAttack([4,1]);
    gameBoard1.receiveAttack([4,2]);
    gameBoard1.receiveAttack([4,3]);

    expect(gameBoard1.sunkAll()).toBe(true);

})

test('.randomShip creates randomShip with correct length', () => {
    
    const gameBoard1 = gameBoard()
    const ship = gameBoard1.randomShip(5, 1);

    expect(ship.length).toBe(5);

})

test('.nRrandomShips creates n randomShips with correct length', () => {

    const gameBoard1 = gameBoard();
    gameBoard1.nRandomShips(2, 4);
    expect(gameBoard1.ships.length).toBe(2);
    expect(gameBoard1.shipsC.length).toBe(8);

})