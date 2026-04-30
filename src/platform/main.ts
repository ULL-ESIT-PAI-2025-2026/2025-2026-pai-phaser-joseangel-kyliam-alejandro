/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Jose Angel Portillo Garcia
 * @author Alejandro Feo Martin
 * @author Kyliam Gabriel Chinea Salcedo
 * @since Apr 29 2026
 * @desc Entry point of the Phaser game application.
 */

import {StartGame} from './game';

/**
 * @desc Initialises and starts the game inside the given container element.
 */
function main() {
  StartGame('game-container');
}

main();

