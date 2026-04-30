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
 * @desc Represents a clock turning
 */

import * as Phaser from 'phaser';

/** @classdesc Clock sprite that turns */
export default class Clock extends Phaser.Physics.Arcade.Sprite {
  private readonly RUN_ANIMATION_FRAME_RATE = 4;
  private readonly VERTICAL_DIMENSION: number = 50; // pixels
  private readonly HORIZONTAL_DIMENSION: number = 50;

  /**
   * @desc Constructor initializes the clock sprite
   * @param scene - The Phaser scene instance containing this player.
   * @param x - Initial horizontal spawn position.
   * @param y - Initial vertical spawn position.
   */
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'clock-sprite');
    scene.add.existing(this);
    this.setDisplaySize(this.VERTICAL_DIMENSION, this.HORIZONTAL_DIMENSION);
    this.initializeAnimations(scene);
  }

  /**
   * @desc Creates animation definitions for player states (run, idle, jump).
   * @param scene - The scene containing animation definitions.
   */
  private initializeAnimations(scene: Phaser.Scene): void {
    // Create "run" animation using first 10 frames of spritesheet
    if (!scene.anims.exists('run')) {
      scene.anims.create({
        key: 'run',
        frames: scene.anims.generateFrameNumbers('clock-sprite', { start: 0, end: 9 }),
        frameRate: this.RUN_ANIMATION_FRAME_RATE,
        repeat: -1
      });
    }
  }

  /**
   * @desc Updates player state every frame: handles movement input, collision detection,
   * animation state, and jump physics.
   */
  update(): void {
     this.anim
  }
}