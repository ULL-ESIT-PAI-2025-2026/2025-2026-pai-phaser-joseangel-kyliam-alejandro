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
 * @desc Demonstrates the overlap physics feature in Phaser 3, triggering events without physical collision.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A scene demonstrating physics overlap between two game objects
 * without causing solid physical collision responses (like bouncing or blocking).
 */
export default class Physics5 extends Phaser.Scene {
  /**
   * @desc Instantiates the overlap demonstration scene with its unique Phaser key.
   */
  constructor() { 
    super('Physics5'); 
  }

  /**
   * @desc Initializes the scene by creating a moving player object and a static collectible,
   * setting up their physics properties, and defining the overlap callback behavior.
   */
  create(): void {
    const playerShape: Phaser.GameObjects.Rectangle = this.add.rectangle(200, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(playerShape);

    const coinShape: Phaser.GameObjects.Rectangle = this.add.rectangle(250, 400, 30, 30, 0xffff00);
    this.physics.add.existing(coinShape);
    
    const coinPhysicsBody = coinShape.body as Phaser.Physics.Arcade.Body;
    coinPhysicsBody.setAllowGravity(false); 

    this.physics.add.overlap(playerShape, coinShape, () => {
      console.log('Moneda recogida');
      coinShape.destroy(); 
    });

    const playerPhysicsBody = playerShape.body as Phaser.Physics.Arcade.Body;
    playerPhysicsBody.setVelocityX(100);
  }
}