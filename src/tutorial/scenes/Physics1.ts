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
 * @desc Demonstrates the basic application of Arcade Physics and gravity to a game object.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A scene demonstrating how to enable the physics engine for a basic
 * geometric shape, allowing global gravity to act upon it.
 */
export default class Physics1 extends Phaser.Scene {
  /**
   * @desc Instantiates the basic physics demonstration scene with its unique Phaser key.
   */
  constructor() { 
    super('Physics1'); 
  }

  /**
   * @desc Initializes the scene by creating a rectangle and injecting a dynamic 
   * physics body into it, causing it to fall due to gravity.
   */
  create(): void {
    const playerRectangle: Phaser.GameObjects.Rectangle = this.add.rectangle(400, 100, 50, 50, 0x00ff00);
    this.physics.add.existing(playerRectangle);
  }
}