import {ship} from '../game-logic.js';

//ship object tests

test('.length correct when length = 1', () => {

    const ship1 = ship([1,1], [1,1]);

    expect(ship1.length).toBe(1);

})

test('.length correct when length > 1', () => {

    const ship1 = ship([1,1], [1,6]);

    expect(ship1.length).toBe(6);

})

test('.hitPoints correct when length = 1', () => {

    const ship1 = ship([1,1], [1,1]);

    expect(ship1.hitPoints).toStrictEqual([[1,1]]);

})

test('.hitPoints correct when length > 1 same x coordinate', () => {

    const ship1 = ship([1,1], [1,5]);

    expect(ship1.hitPoints.sort()).toStrictEqual([[1,1],[1,2],[1,3],[1,4],[1,5]]);

})

test('.hitPoints correct when length > 1 same y coordinate', () => {

    const ship1 = ship([5,1], [1,1]);

    expect(ship1.hitPoints.sort()).toStrictEqual([[1,1], [2,1], [3,1], [4,1], [5,1]]);

})

test('.hitShip() updates .hits', () => {

    const ship1 = ship([5,1], [1,1]);

    ship1.hit([4,1]);

    expect(ship1.hits).toStrictEqual([[4,1]]);

})

test('.hitShip() returns correct when true', () => {

    const ship1 = ship([5,1], [1,1]);

    expect(ship1.hit([4,1])).toStrictEqual(true)

})

test('.hitShip() returns correct when false', () => {

    const ship1 = ship([5,1], [2,1]);

    expect(ship1.hit([6,1])).toStrictEqual(false)

})

test('.isSunk() returns false when coordinates remain', () => {

    const ship1 = ship([5,1], [1,1]);

    ship1.hit([4,1]);

    expect(ship1.isSunk()).toBe(false);


})

test('.isSunk() returns true when no coordinates are left', () => {

    const ship1 = ship([3,1], [1,1]);

    ship1.hit([3,1]);
    ship1.hit([2,1]);
    ship1.hit([1,1]);

    expect(ship1.isSunk()).toBe(true);


})