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
 * @desc Represents a stationary lava hazard that damages the player on contact.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A static lava sprite representing a hazard obstacle.
 * Kills the player upon contact and causes level restart.
 */
export default class Lava extends Phaser.Physics.Arcade.Sprite {
  /**
   * @desc Constructor initializes a lava sprite at the given position.
   * @param scene - The Phaser scene containing this lava.
   * @param x - Horizontal spawn position.
   * @param y - Vertical spawn position.
   */
  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Initialize sprite using frame 1 from the main spritesheet
    super(scene, x, y, 'main-sprites', 1);

    // Register sprite as a display object
    scene.add.existing(this);
    // Enable static physics body (stationary hazard)
    scene.physics.add.existing(this, true);

    // Set visual dimensions
    this.setDisplaySize(32, 32);
    // Color lava red for hazard indication
    this.setTint(0xff0000);

    // Synchronize physics body with visual dimensions after resize
    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}