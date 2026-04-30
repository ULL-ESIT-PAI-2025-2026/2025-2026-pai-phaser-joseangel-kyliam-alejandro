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
 * @desc Manages the main gameplay loop, object movement, and event emission for the UI.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A core game scene that continuously updates a moving object 
 * and broadcasts custom events to a concurrently running User Interface scene.
 */
export default class GameScene extends Phaser.Scene {
  /** * @desc The visual representation of the player entity moving across the screen. 
   */
  private playerRectangle!: Phaser.GameObjects.Rectangle;

  /** * @desc The horizontal velocity applied to the player entity each frame. 
   */
  private horizontalSpeed: number = 3;

  /**
   * @desc Instantiates the main game scene with its unique Phaser key.
   */
  constructor() {
    super('GameScene');
  }

  /**
   * @desc Initializes the player object and concurrently launches the UI Scene.
   */
  create(): void {
    const { height } = this.scale;
    this.playerRectangle = this.add.rectangle(100, height / 2, 50, 50, 0x00ff00);

    this.scene.launch('UIScene');
  }

  /**
   * @desc Executes the main game loop every frame, handling player movement,
   * screen boundary collisions, and event emission.
   */
  update(): void {
    this.playerRectangle.x += this.horizontalSpeed;

    if (this.playerRectangle.x > 800 || this.playerRectangle.x < 0) {
      this.horizontalSpeed *= -1;
      this.events.emit('collision');
    }
  }
}