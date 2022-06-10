import {ship, gameBoard, AI} from '../game-logic.js';

test('.play returns random coordinates within range', () => {
    const ai = AI();
    const coordinates = ai.play();

    expect(coordinates[0]).toBeLessThanOrEqual(9)
    expect(coordinates[1]).toBeLessThanOrEqual(9)
})