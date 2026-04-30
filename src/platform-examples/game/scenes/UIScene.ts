import * as Phaser from 'phaser';
import eventCenter from '../events/EventCenter';
import { gameState } from '../state/GameState';

export default class UIScene extends Phaser.Scene {
  private livesText!: Phaser.GameObjects.Text;
  private coinsText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;

  constructor() {
    super('UIScene');
  }

  create() {
    this.livesText = this.add.text(20, 20, `Vidas: ${gameState.lives}`, { fontSize: '24px' });
    this.coinsText = this.add.text(20, 50, `Monedas: ${gameState.coins}`, { fontSize: '24px', color: '#ff0' });
    this.timerText = this.add.text(780, 20, `Tiempo: 00:00`, { fontSize: '24px' }).setOrigin(1, 0);

    eventCenter.on('update-lives', (v: number) => this.livesText.setText(`Vidas: ${v}`));
    eventCenter.on('update-coins', (c: number) => this.coinsText.setText(`Monedas: ${c}`));
    
    // Al recibir el evento de tiempo, usamos el formateador del GameState
    eventCenter.on('update-timer', () => {
        this.timerText.setText(`Tiempo: ${gameState.getFormattedTime()}`);
    });
  }
}