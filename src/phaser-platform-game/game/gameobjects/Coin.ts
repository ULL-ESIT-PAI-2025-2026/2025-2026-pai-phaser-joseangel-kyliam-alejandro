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

export default class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'coin-texture', 0);

    scene.add.existing(this);
    // También la hacemos estática para ahorrar cálculos físicos
    scene.physics.add.existing(this, true); 

    this.setDisplaySize(20, 20);
    this.setTint(0xffff00);

    (this.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
  }
}