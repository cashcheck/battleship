import {ship, gameBoard} from '../game-logic.js';

test('.receiveAttack() updates ship.hits', () => {

    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeValidShip(ship2);
    gameBoard1.receiveAttack([4,1]);

    expect(ship2.hits).toStrictEqual([[4,1]]);

})

test('.receiveAttack() updates .misses', () => {
    
    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeValidShip(ship2);
    gameBoard1.receiveAttack([5,1]);

    expect(gameBoard1.misses).toStrictEqual([[5,1]]);

})

test('.sunkAll() returns False correctly', () => {

    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeValidShip(ship2);
    gameBoard1.receiveAttack([4,1]);
    gameBoard1.receiveAttack([4,2]);

    expect(gameBoard1.sunkAll()).toBe(false);

})

test('.sunkAll() returns True correctly', () => {

    const ship2 = ship([4,1], [4,3]);
    const gameBoard1 = gameBoard();

    gameBoard1.placeValidShip(ship2);
    gameBoard1.receiveAttack([4,1]);
    gameBoard1.receiveAttack([4,2]);
    gameBoard1.receiveAttack([4,3]);

    expect(gameBoard1.sunkAll()).toBe(true);

})

test('placeValidShip() only places valid ships', () => {

    const gameBoard1 = gameBoard();

    const shipa = ship([4,1], [4,3]);
    const shipb = ship([8,7], [8,9]);
    const shipc = ship([8,6], [8,4]);
    const shipd = ship([0,1], [-2,1]);

    expect(gameBoard1.placeValidShip(shipa)).toBe(true);
    expect(gameBoard1.placeValidShip(shipb)).toBe(true);
    expect(gameBoard1.placeValidShip(shipc)).toBe(false);
    expect(gameBoard1.placeValidShip(shipd)).toBe(false);

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

test('.findShip returns the correct ship', () => {

    const gameBoard1 = gameBoard();
    const ship2 = ship([4,1], [4,3]);
    const ship1 = ship([8,7], [8,9]);
    gameBoard1.placeValidShip(ship2);
    gameBoard1.placeValidShip(ship1);

    expect(gameBoard1.findShip([4,2])).toEqual(ship2);
    expect(gameBoard1.findShip([8,7])).toEqual(ship1);

})

test('.findShipIndex returns the correct index', () => {

    const gameBoard1 = gameBoard();
    const ship2 = ship([4,1], [4,3]);
    const ship1 = ship([8,7], [8,9]);
    gameBoard1.placeValidShip(ship2);
    gameBoard1.placeValidShip(ship1);

    expect(gameBoard1.findShipIndex([4,2])).toEqual(0);
    expect(gameBoard1.findShipIndex([8,7])).toEqual(1);
})

test('.removeShip removes ships and all associated data (adjacencies, coordinates)', () => {

    const gameBoard1 = gameBoard();
    const ship2 = ship([4,1], [4,3]);
    const ship1 = ship([8,6], [8,8]);
    gameBoard1.placeValidShip(ship2);
    gameBoard1.placeValidShip(ship1);
    gameBoard1.removeShip([4,2]);

    expect(gameBoard1.adjacent.sort()).toEqual([[7,5], [8,5], [9,5], [7,6], [9,6], [7,7], [9,7], [7,8], [9,8], [7,9], [8,9], [9,9]].sort());
    expect(gameBoard1.shipsC.sort()).toEqual([[8,6],[8,7],[8,8]]);
    expect(gameBoard1.ships.length).toBe(1);

})