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
 * @desc Manages all sound effects and background music for the game.
 */

import * as Phaser from 'phaser';

export default class Exit extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.setDisplaySize(32, 32);
    this.setTint(0x0000ff);

    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}