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
 * @desc Global event emitter for inter-scene communication and state updates.
 */

import * as Phaser from 'phaser';

/**
 * @desc A global event emitter instance used for broadcasting state changes
 * between independent scenes (GameScene and UIScene).
 */
const eventCenter = new Phaser.Events.EventEmitter();

export default eventCenter;