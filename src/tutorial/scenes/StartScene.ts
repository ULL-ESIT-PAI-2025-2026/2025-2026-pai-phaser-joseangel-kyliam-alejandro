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
 * @desc Manages the main menu scene, providing navigation to different game examples.
 */

import * as Phaser from 'phaser';

/**
 * @classdesc Main menu scene that allows the user to select and launch
 * various physics and scene management demonstrations.
 */
export default class StartScene extends Phaser.Scene {
  /**
   * @desc Instantiates the StartScene with its unique Phaser key.
   */
  constructor() {
    super('StartScene');
  }

  /**
   * @desc Initializes the visual elements of the menu, including titles and navigation buttons.
   */
  create(): void {
    this.add.text(400, 50, 'MENÚ PRINCIPAL', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 120, '--- ESCENAS ---', {
      fontSize: '24px',
      color: '#ffff00'
    }).setOrigin(0.5);

    this.createNavigationButton(170, '1. Cambio de escena', 'LevelScenes1');
    this.createNavigationButton(210, '2. Escenas simultáneas', 'GameScene');

    this.add.text(400, 280, '--- FÍSICAS ---', {
      fontSize: '24px',
      color: '#00ffff'
    }).setOrigin(0.5);

    this.createNavigationButton(330, '3. Gravedad', 'Physics1');
    this.createNavigationButton(370, '4. Collider', 'Physics2');
    this.createNavigationButton(410, '5. Rebote', 'Physics3');
    this.createNavigationButton(450, '6. Input', 'Physics4');
    this.createNavigationButton(490, '7. Overlap', 'Physics5');
  }

  /**
   * @desc Helper method to create a clickable text button that transitions to another scene.
   * @param yPosition - The vertical coordinate where the button will be placed.
   * @param buttonText - The display text of the button.
   * @param targetSceneName - The registry key of the scene to start upon clicking.
   */
  private createNavigationButton(yPosition: number, buttonText: string, targetSceneName: string): void {
    const interactiveButton: Phaser.GameObjects.Text = this.add.text(400, yPosition, buttonText, {
      fontSize: '20px',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

    interactiveButton.on('pointerdown', () => {
      this.scene.start(targetSceneName);
    });
  }
}