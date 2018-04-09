import { Grid } from "./gameboard";
import { Ship } from './ship';
var grid = new Grid();
grid.create_grid();
grid.render();
var ship = new Ship(2);
ship.print_length();
ship.orientation();
ship.place_ship();
