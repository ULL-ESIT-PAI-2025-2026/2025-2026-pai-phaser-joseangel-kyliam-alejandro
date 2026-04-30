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
 * @desc Demonstrates the use of colliders between a dynamic body and a static body in Arcade Physics.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A scene demonstrating how to create physical collisions
 * preventing a dynamic object from passing through a static object.
 */
export default class Physics2 extends Phaser.Scene {
  /**
   * @desc Instantiates the collider demonstration scene with its unique Phaser key.
   */
  constructor() { 
    super('Physics2'); 
  }

  /**
   * @desc Initializes the static ground and a falling player rectangle, and sets up
   * a collider to resolve physical intersections between them.
   */
  create(): void {
    const groundPlatform: Phaser.GameObjects.Rectangle = this.add.rectangle(400, 550, 800, 50, 0x555555);
    this.physics.add.existing(groundPlatform, true);

    const playerRectangle: Phaser.GameObjects.Rectangle = this.add.rectangle(400, 100, 50, 50, 0x00ff00);
    this.physics.add.existing(playerRectangle);

    this.physics.add.collider(playerRectangle, groundPlatform);
  }
}