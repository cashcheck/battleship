import {ship, ship2, gameBoard, AI} from './game-logic.js';


function initInput(gb) {

    addCoordinates(gb);
    addAdjacent(gb);
    addShips(gb);
    drag(gb);
    rotate(gb);
}

function addCoordinates(gb) {
    
    gb.shipsC.forEach(coordinate => {

        let x = coordinate[0];
        let y = coordinate[1];
        
        const cell = document.querySelector(`[x='${x}'][y='${y}']`);
        
        cell.classList.add('active');
        
        })
}

function addAdjacent(gb) {
    
    gb.adjacent.forEach(coordinate => {

        let x = coordinate[0];
        let y = coordinate[1];
        
        //check if in range
        if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {

            const cell = document.querySelector(`[x='${x}'][y='${y}']`);
            
            cell.classList.add('adjacent');

        }
        
    })
}

function addShips(gb) {
    gb.ships.forEach( s => {

        s.hitPoints.sort();
        let x = s.hitPoints[0][0];
        let y = s.hitPoints[0][1];
        const length = s.length*30;
        const orientation = s.orientation;

        const cell = document.querySelector(`[x='${x}'][y='${y}']`);
        const drag = document.createElement('div')
        drag.classList.add('drag');
        drag.setAttribute('draggable', 'true');
        drag.setAttribute('orientation', `${s.orientation}`);
        drag.setAttribute('length', `${s.length}`)

        if (orientation == 0) {
            drag.style.width = `${length}px`;
            drag.style.height = `28px`;
        }
        else {
            drag.style.height = `${length}px`;
            drag.style.width = `28px`;
        }

        cell.appendChild(drag);
    })
}

function drag(gb) {

let dragged = null;
let rShip = null;

document.addEventListener('dragstart', (e) => {
    
    dragged = e.target;
    let x = parseInt(dragged.parentNode.getAttribute('x'));
    let y = parseInt(dragged.parentNode.getAttribute('y'));
    rShip = gb.removeShip([x,y]);
    removeShipDOM(rShip);
    addAdjacent(gb);

})

document.addEventListener("dragover", (e) => {
   
    e.preventDefault();

  });

document.addEventListener('drop', (e) => {

    e.preventDefault();
    
    let newCell = e.target;
    if (newCell.className == 'drag') {
        newCell = newCell.parentNode
    }

    let x = parseInt(newCell.getAttribute('x'));
    let y = parseInt(newCell.getAttribute('y'));
    const l = parseInt(dragged.getAttribute('length'));
    const o = parseInt(dragged.getAttribute('orientation'));

    const newShip = ship2([x,y], l, o);

    if (gb.placeValidShip(newShip)) {

        dragged.parentNode.removeChild(dragged);
        newCell.appendChild(dragged);
        addShipDOM(newShip);
    }

    else {
        addShipDOM(rShip);
        gb.placeValidShip(rShip);
    }

})

}

function removeShipDOM(s) {

    s.adjacent.forEach(coordinate => {

        let x = coordinate[0];
        let y = coordinate[1];

        //check if in range
        if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {

            const cell = document.querySelector(`[x='${x}'][y='${y}']`);
            
            cell.classList.remove('adjacent');

        }

    })

    s.hitPoints.forEach(coordinate => {

        let x = coordinate[0];
        let y = coordinate[1];

        const cell = document.querySelector(`[x='${x}'][y='${y}']`);
            
        cell.classList.remove('active');

    })
}

function addShipDOM(s) {

    s.adjacent.forEach(coordinate => {

        let x = coordinate[0];
        let y = coordinate[1];

        //check if in range
        if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {

            const cell = document.querySelector(`[x='${x}'][y='${y}']`);
            
            cell.classList.add('adjacent');

        }

    })

    s.hitPoints.forEach(coordinate => {

        let x = coordinate[0];
        let y = coordinate[1];

        const cell = document.querySelector(`[x='${x}'][y='${y}']`);
            
        cell.classList.add('active');

    })

}

function rotate(gb) {
    
    const ships = document.querySelectorAll('.drag');
    ships.forEach(s => {

        s.addEventListener('click', e => {

        //getting parameters for ship
        
        console.log('click')
        const dragDiv = e.target;
        const x = parseInt(dragDiv.parentNode.getAttribute('x'));
        const y = parseInt(dragDiv.parentNode.getAttribute('y'));
        const l = parseInt(dragDiv.getAttribute('length'));
        const o = parseInt(dragDiv.getAttribute('orientation'));

        let currentShip = ship2([x,y], l, o);
        console.log(currentShip);
        let newShip = currentShip.rotate();
        gb.removeShip([x,y]);

        //if new ship is a valid placement
        if (gb.placeValidShip(newShip)) {
            removeShipDOM(currentShip);
            addShipDOM(newShip);
            dragDiv.setAttribute('orientation', `${newShip.orientation}`)

            if (newShip.orientation == 0) {
                dragDiv.style.width = `${30*newShip.length}px`;
                dragDiv.style.height = `28px`;
            }
            else {
                dragDiv.style.height = `${30*newShip.length}px`;
                dragDiv.style.width = `28px`;
            }

        }

        else {
            gb.placeValidShip(currentShip);
        }

        })

    })

}


export {initInput}



