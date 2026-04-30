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
 * @desc Demonstrates launching and running scenes concurrently, such as overlaying a UI scene.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A demonstration scene that runs concurrently with a User Interface (UI) scene,
 * showcasing Phaser's ability to overlay and manage multiple active scenes.
 */
export default class LevelScenes2 extends Phaser.Scene {
  /**
   * @desc Instantiates the concurrent scenes demonstration with its unique Phaser key.
   */
  constructor() {
    super('LevelScenes2');
  }

  /**
   * @desc Initializes the scene by launching the UIScene in parallel and displaying base text.
   */
  create(): void {
    this.scene.launch('UIScene');

    this.add.text(400, 300, 'Juego + UI', {
      fontSize: '32px'
    }).setOrigin(0.5);
  }
}