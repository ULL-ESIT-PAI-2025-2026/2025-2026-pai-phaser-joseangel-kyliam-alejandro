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
 * @desc Manages the pause menu scene providing options to resume, restart,
 * or exit the current game session.
 */

import * as Phaser from 'phaser';
import { gameState } from '../state/GameState';

/**
 * @classdesc Pause menu scene displayed over the gameplay with interactive
 * buttons for session control (resume, restart, exit).
 */
export default class PauseScene extends Phaser.Scene {
  /**
   * @desc Instantiates the PauseScene with its unique Phaser key identifier.
   */
  constructor() {
    super('PauseScene');
  }

  /**
   * @desc Creates the pause menu with semi-transparent overlay and control buttons.
   */
  create(): void {
    // Retrieve canvas dimensions for centered UI
    const canvasWidth = this.scale.width;
    const canvasHeight = this.scale.height;

    // Create semi-transparent background to dim gameplay
    this.add.rectangle(canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight, 0x000000, 0.6);

    // Display "PAUSA" title
    this.add.text(canvasWidth / 2, canvasHeight / 2 - 50, 'PAUSA', { 
      fontSize: '48px' 
    }).setOrigin(0.5);

    // Create Resume button
    const resumeButton = this.add.text(canvasWidth / 2, canvasHeight / 2 + 50, 'RESUME (P)', { 
      fontSize: '32px', 
      color: '#0f0' 
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // Create Restart button
    const restartButton = this.add.text(canvasWidth / 2, canvasHeight / 2 + 110, 'RESTART', { 
      fontSize: '32px', 
      color: '#f00' 
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // Register button click handlers
    resumeButton.on('pointerdown', () => this.resumeGameplay());
    restartButton.on('pointerdown', () => this.restartGameplay());

    // Allow P key to resume game
    this.input.keyboard?.on('keydown-P', () => this.resumeGameplay());
  }

  /**
   * @desc Resumes the paused game session and closes the pause menu.
   */
  private resumeGameplay(): void {
    // Resume execution of the paused GameScene
    this.scene.resume('GameScene');
    // Close and destroy the pause menu
    this.scene.stop();
  }

  /**
   * @desc Restarts the game from the beginning, resetting all game state and progress.
   */
  private restartGameplay(): void {
    gameState.resetGame();
    this.scene.stop('GameScene');
    // Start GameScene fresh to reload level
    this.scene.start('GameScene'); 
    this.scene.stop();
  }
}