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
 * @desc Demonstrates the bounce (restitution) property in Arcade Physics, making an object rebound upon collision.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A scene demonstrating how to apply a bounce coefficient to a dynamic physics body,
 * causing it to rebound upon colliding with a static object.
 */
export default class Physics3 extends Phaser.Scene {
  /**
   * @desc Instantiates the bounce demonstration scene with its unique Phaser key.
   */
  constructor() { 
    super('Physics3'); 
  }

  /**
   * @desc Initializes the static ground, a falling player rectangle, and configures
   * the physical restitution (bounce) upon collision.
   */
  create(): void {
    const groundPlatform: Phaser.GameObjects.Rectangle = this.add.rectangle(400, 550, 800, 50, 0x555555);
    this.physics.add.existing(groundPlatform, true);

    const playerRectangle: Phaser.GameObjects.Rectangle = this.add.rectangle(400, 100, 50, 50, 0x00ff00);
    this.physics.add.existing(playerRectangle);

    const playerPhysicsBody = playerRectangle.body as Phaser.Physics.Arcade.Body;
    playerPhysicsBody.setBounce(0.8, 0.8);

    this.physics.add.collider(playerRectangle, groundPlatform);
  }
}