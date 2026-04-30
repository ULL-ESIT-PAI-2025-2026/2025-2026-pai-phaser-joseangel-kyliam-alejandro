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
 * @desc Manages the user interface displaying game statistics including
 * remaining lives, collected coins, and elapsed game time.
 */

import * as Phaser from 'phaser';
import eventCenter from '../events/EventCenter';
import { gameState } from '../state/GameState';

/**
 * @classdesc User Interface scene that displays and updates game statistics
 * in response to game state changes via event system.
 */
export default class UIScene extends Phaser.Scene {
  /**
   * @desc Text object displaying remaining player lives count.
   */
  private livesDisplayText!: Phaser.GameObjects.Text;

  /**
   * @desc Text object displaying collected coins count.
   */
  private coinsDisplayText!: Phaser.GameObjects.Text;

  /**
   * @desc Text object displaying elapsed game time in MM:SS format.
   */
  private timerDisplayText!: Phaser.GameObjects.Text;

  /**
   * @desc Instantiates the UIScene with its unique Phaser key identifier.
   */
  constructor() {
    super('UIScene');
  }

  /**
   * @desc Initializes UI elements and registers event listeners for state updates.
   */
  create(): void {
    this.livesDisplayText = this.add.text(20, 20, `Vidas: ${gameState.lives}`, { 
      fontSize: '24px' 
    });
    
    this.coinsDisplayText = this.add.text(20, 50, `Monedas: ${gameState.coins}`, { 
      fontSize: '24px', 
      color: '#ff0' 
    });
    
    this.timerDisplayText = this.add.text(780, 20, `Tiempo: 00:00`, { 
      fontSize: '24px' 
    }).setOrigin(1, 0);

    // Listen for live count changes
    eventCenter.on('update-lives', (updatedLivesCount: number) => {
      this.livesDisplayText.setText(`Vidas: ${updatedLivesCount}`);
    });

    // Listen for coin collection events
    eventCenter.on('update-coins', (updatedCoinCount: number) => {
      this.coinsDisplayText.setText(`Monedas: ${updatedCoinCount}`);
    });
    
    // Listen for timer increment events
    eventCenter.on('update-timer', () => {
        this.timerDisplayText.setText(`Tiempo: ${gameState.getFormattedTime()}`);
    });
  }
}