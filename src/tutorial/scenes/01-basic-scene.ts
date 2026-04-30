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
 * @classdesc A demonstration scene showcasing the origin and the scene 
 */
export default class SceneDimensions extends Phaser.Scene {
  /**
   * @desc Instantiates the scene with a UNIQUE Phaser key.
   */
  constructor() {
    super('scene-dimensions');
  }

  /**
   * @desc Retrieves the size and shows it in the center.
   */
  create(): void {
    const sceneInformation: string = '(0, 0)' + '\n' + 'Size: ';
    const originMarker: Phaser.GameObjects.Text = this.add.text(0, 0, markerString) {
      fontSize: '32px'
    });

     
    const canvasSizeMarker: Phaser.GameObjects.Text = this.add.text(xLimit, yLimit, `(${xLimit}, 0)`, {
      fontSize: '32px'
    });
  }

}