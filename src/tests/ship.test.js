import {ship, ship2} from '../game-logic.js';

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

test('.hitShip() returns correct true/false', () => {

    const ship1 = ship([5,1], [1,1]);

    expect(ship1.hit([4,1])).toStrictEqual(true);
    expect(ship1.hit([6,1])).toStrictEqual(false)

})

test('.isSunk() returns correct true/false', () => {

    const ship1 = ship([5,1], [1,1]);
    ship1.hit([4,1]);

    const ship2 = ship([3,1], [1,1]);
    ship2.hit([3,1]);
    ship2.hit([2,1]);
    ship2.hit([1,1]);

    expect(ship1.isSunk()).toBe(false);
    expect(ship2.isSunk()).toBe(true);

})

test('.orientation returns correct orientation', () => {

    const ship1 = ship([3,1], [1,1]);
    const ship2 = ship([1,4], [1,1]);
    const ship3 = ship([0,8], [2,8]);


    expect(ship1.orientation).toBe(0);
    expect(ship2.orientation).toBe(1);
    expect(ship3.orientation).toBe(0);
})

test('.adjacent returns correct adjecent coordinates', () => {

    const ship1 = ship([3,1], [1,1]);
    const adjacencyList = [[0,0], [1,0], [2,0], [3,0], [4,0], [0,1], [4,1], [0,2], [1,2],[ 2,2], [3,2], [4,2]];

    const ship2 = ship([3,3],[3,5]);
    const adjacencyList2 = [[2,2], [3,2], [4,2], [2,3], [4,3], [2,4], [4,4], [2,5], [4,5], [2,6], [3,6], [4,6]];

    const ship3 = ship([1,1],[1,1]);
    const adjacencyList3 = [[0,0], [0,1], [0,2], [1,0], [1,2], [2,0], [2,1], [2,2]]


    expect(ship1.adjacent.sort()).toStrictEqual(adjacencyList.sort());
    expect(ship2.adjacent.sort()).toStrictEqual(adjacencyList2.sort());
    expect(ship3.adjacent.sort()).toStrictEqual(adjacencyList3);

})

test('.ship2 creates correct ship with inputs: 1 coordinate, orientation and length', () => {


    const ship1 = ship2([0,1],3, 0);

    expect(ship1.length).toBe(3);
    expect(ship1.orientation).toBe(0);
    expect(ship1.hitPoints.sort()).toStrictEqual([[0,1],[1,1],[2,1]]);

})