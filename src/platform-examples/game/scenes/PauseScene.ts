import * as Phaser from 'phaser';
import { gameState } from '../state/GameState';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super('PauseScene');
  }

  create() {
    // 1. Fondo semi-transparente para oscurecer el juego
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6);

    this.add.text(width / 2, height / 2 - 50, 'PAUSA', { fontSize: '48px' }).setOrigin(0.5);

    // 2. Botón Resume
    const resumeBtn = this.add.text(width / 2, height / 2 + 50, 'RESUME (P)', { fontSize: '32px', color: '#0f0' })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // 3. Botón Restart
    const restartBtn = this.add.text(width / 2, height / 2 + 110, 'RESTART', { fontSize: '32px', color: '#f00' })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // Lógica de botones
    resumeBtn.on('pointerdown', () => this.resumeGame());
    restartBtn.on('pointerdown', () => this.restartGame());

    // Tecla P para quitar pausa también
    this.input.keyboard?.on('keydown-P', () => this.resumeGame());
  }

  private resumeGame() {
    // Resume: reactiva las escenas pausadas
    this.scene.resume('GameScene');
    // Stop: cierra esta escena y la destruye
    this.scene.stop();
  }

  private restartGame() {
    gameState.resetGame();
    this.scene.stop('GameScene');
    this.scene.start('GameScene'); // start() para GameScene limpia todo
    this.scene.stop();
  }
}