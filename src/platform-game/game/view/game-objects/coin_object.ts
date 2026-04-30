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
 * @desc Coin Object that emit events
 */

import * as Phaser from 'phaser';


/**
 * Class representing a coin.
 * Emits the 'coin-collected' event when picked up.
 */
export class Coin extends Phaser.GameObjects.Image {
  /**
   * Event name emitted when the coin is collected.
   * @const
   */
  public static readonly EVENT_COLLECTED = 'coin-collected';

  /**
   * @param scene The Phaser scene this object belongs to.
   * @param x The horizontal position.
   * @param y The vertical position.
   * @param texture The texture key from the cache.
   * @param frame Optional texture frame.
   */
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | number = 0,
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.init();
  }

  /**
   * Handles the collection logic.
   * Emits a custom event for the scene to respond and then destroys itself.
   */
  collect(): void {
    this.emit(Coin.EVENT_COLLECTED, this);
    this.destroy();
  }

  /**
   * Initial configuration for the coin.
   * @private
   */
  private init(): void {
    this.setOrigin(0.5, 0.5);
  }
}