# Battleship



## From [The Odin Project](https://www.theodinproject.com/courses/javascript/lessons/battleship)

##Rules
Same as original battleship with a few additional rules:
1. Ships may not be placed in squares adjacent to ship squares.
2. If a player's last move was a hit, they get to move again.
3. Once a ship is sunk all adjacent squares will also be sunk.

##What I learned
Since this was a learning project I thought I'd briefly talk about some interesting things I've learned from completing this project.
1. Unit testing - this was my longer project done with unit testing. It's really useful to make sure that everything is working the way it's supposed to.
2. .forEach - returning a value during the forEach loop does end the function. This messed with my code a lot.
3. Comparing objects - I had to compare arrays alot and thus had to start using array.toString() since javascript does not automatically compare objects the same way python does.
4. Drag/drop - this was my first project using the drag/drop events.

##Built with
* js, html, css
* jest for testing

