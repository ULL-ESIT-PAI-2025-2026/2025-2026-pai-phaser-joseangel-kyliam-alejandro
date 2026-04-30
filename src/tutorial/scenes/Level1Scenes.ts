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
 * @desc Demonstrates basic scene transitions using user input to switch between scenes.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc A demonstration scene showcasing how to transition from one active 
 * scene to another by stopping the current scene and starting a new one.
 */
export default class LevelScenes1 extends Phaser.Scene {
  /**
   * @desc Instantiates the scene transition demonstration with its unique Phaser key.
   */
  constructor() {
    super('LevelScenes1');
  }

  /**
   * @desc Initializes the interactive text element that triggers the scene change upon being clicked.
   */
  create(): void {
    const transitionText: Phaser.GameObjects.Text = this.add.text(400, 300, 'Click para cambiar', {
      fontSize: '32px'
    });

    transitionText
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('StartScene');
      });
  }
}