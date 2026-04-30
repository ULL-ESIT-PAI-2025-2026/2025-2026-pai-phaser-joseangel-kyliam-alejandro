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
 * @desc Represents a static platform wall tile that provides collision surfaces.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A static platform wall sprite with fixed physics properties.
 * Walls serve as solid surfaces for player movement and jumping.
 */
export default class Wall extends Phaser.Physics.Arcade.Sprite {
  /**
   * @desc Constructor initializes a wall sprite at the given position.
   * @param scene - The Phaser scene containing this wall.
   * @param x - Horizontal spawn position.
   * @param y - Vertical spawn position.
   */
  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Initialize sprite using frame 0 from the main spritesheet
    super(scene, x, y, 'main-sprites', 0);

    // Register sprite as a display object
    scene.add.existing(this);
    // Enable physics with static body (no gravity, no movement)
    scene.physics.add.existing(this, true); 

    // Set visual dimensions
    this.setDisplaySize(32, 32);
    // Color the wall slightly dark
    this.setTint(0x666666);

    // Synchronize physics body with visual dimensions after resize
    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}